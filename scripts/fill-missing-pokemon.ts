import { readFileSync } from 'node:fs';
import { applicationDefault, cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

type GenerationRange = {
	gen: number;
	startDex: number;
	endDex: number;
};

type PokemonApiResponse = {
	id: number;
	name: string;
	sprites: {
		front_default: string | null;
		front_shiny: string | null;
		other?: {
			['official-artwork']?: {
				front_default: string | null;
				front_shiny: string | null;
			};
		};
	};
	types: Array<{
		slot: number;
		type: { name: string };
	}>;
};

const generationRanges: GenerationRange[] = [
	{ gen: 2, startDex: 152, endDex: 251 },
	{ gen: 3, startDex: 252, endDex: 386 },
	{ gen: 4, startDex: 387, endDex: 493 },
	{ gen: 5, startDex: 494, endDex: 649 },
	{ gen: 6, startDex: 650, endDex: 721 },
	{ gen: 7, startDex: 722, endDex: 809 },
	{ gen: 8, startDex: 810, endDex: 905 },
	{ gen: 9, startDex: 906, endDex: 1025 }
];

const typeIconLookup: Record<string, string> = {
	bug: 'https://archives.bulbagarden.net/media/upload/5/51/Bug_icon_HOME3.png',
	dark: 'https://archives.bulbagarden.net/media/upload/7/71/Dark_icon_HOME3.png',
	dragon: 'https://archives.bulbagarden.net/media/upload/c/c6/Dragon_icon_HOME3.png',
	electric: 'https://archives.bulbagarden.net/media/upload/c/cf/Electric_icon_HOME3.png',
	fairy: 'https://archives.bulbagarden.net/media/upload/0/0b/Fairy_icon_HOME3.png',
	fighting: 'https://archives.bulbagarden.net/media/upload/c/c2/Fighting_icon_HOME3.png',
	fire: 'https://archives.bulbagarden.net/media/upload/f/f9/Fire_icon_HOME3.png',
	flying: 'https://archives.bulbagarden.net/media/upload/c/c5/Flying_icon_HOME3.png',
	ghost: 'https://archives.bulbagarden.net/media/upload/2/23/Ghost_icon_HOME3.png',
	grass: 'https://archives.bulbagarden.net/media/upload/8/81/Grass_icon_HOME3.png',
	ground: 'https://archives.bulbagarden.net/media/upload/e/ee/Ground_icon_HOME3.png',
	ice: 'https://archives.bulbagarden.net/media/upload/8/86/Ice_icon_HOME3.png',
	normal: 'https://archives.bulbagarden.net/media/upload/8/8c/Normal_icon_HOME3.png',
	poison: 'https://archives.bulbagarden.net/media/upload/9/98/Poison_icon_HOME3.png',
	psychic: 'https://archives.bulbagarden.net/media/upload/2/2d/Psychic_icon_HOME3.png',
	rock: 'https://archives.bulbagarden.net/media/upload/5/51/Rock_icon_HOME3.png',
	steel: 'https://archives.bulbagarden.net/media/upload/7/78/Steel_icon_HOME3.png',
	water: 'https://archives.bulbagarden.net/media/upload/e/e7/Water_icon_HOME3.png'
};

const defaultBucket = 'shinydiary-91a6f.appspot.com';

function resolveCredential() {
	const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT;
	if (serviceAccountPath) {
		const contents = readFileSync(serviceAccountPath, 'utf-8');
		return cert(JSON.parse(contents));
	}
	return applicationDefault();
}

initializeApp({
	credential: resolveCredential(),
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET ?? defaultBucket
});

const firestore = getFirestore();
const bucket = getStorage().bucket();

async function main() {
	for (const range of generationRanges) {
		console.log(`Checking Generation ${range.gen}`);
		const existingDexNumbers = await fetchExistingDexNumbers(range.gen);

		for (let dexNr = range.startDex; dexNr <= range.endDex; dexNr++) {
			if (existingDexNumbers.has(dexNr)) {
				continue;
			}

			await createPokemonEntry(range.gen, dexNr);
		}
	}
}

async function fetchExistingDexNumbers(gen: number): Promise<Set<number>> {
	const set = new Set<number>();
	const collection = firestore
		.collection('Pokémon')
		.doc(`Generation${gen}`)
		.collection('Pokémon');

	const snapshot = await collection.get();
	snapshot.forEach((doc) => {
		const dexNr = doc.get('dexNr');
		if (typeof dexNr === 'number') {
			set.add(dexNr);
		} else {
			const parsed = Number(doc.id);
			if (!Number.isNaN(parsed)) {
				set.add(parsed);
			}
		}
	});
	return set;
}

async function createPokemonEntry(gen: number, dexNr: number) {
	console.log(`Creating entry for dex #${dexNr}`);
	const pokemon = await fetchPokemonData(dexNr);
	if (!pokemon) {
		console.warn(`Unable to fetch data for ${dexNr}, skipping.`);
		return;
	}

	const normalSprite = resolveSpriteUrl(pokemon, false);
	const shinySprite = resolveSpriteUrl(pokemon, true);

	if (!normalSprite || !shinySprite) {
		console.warn(`Missing sprite for ${pokemon.name}, skipping image upload.`);
		return;
	}

	const [normalUrl, shinyUrl] = await Promise.all([
		uploadSpriteAndGetUrl(normalSprite, `sprites/${dexNr}-normal.png`),
		uploadSpriteAndGetUrl(shinySprite, `sprites/${dexNr}-shiny.png`)
	]);

	const typedIcons = mapTypesToIcons(pokemon.types);

	const docRef = firestore
		.collection('Pokémon')
		.doc(`Generation${gen}`)
		.collection('Pokémon')
		.doc(String(dexNr));

	await docRef.set(
		{
			URL_Normal: normalUrl,
			URL_Shiny: shinyUrl,
			active: false,
			completedStatus: false,
			counter: 0,
			dexNr,
			name: pokemon.name,
			typing1: typedIcons[0] ?? '',
			typing2: typedIcons[1] ?? ''
		},
		{ merge: true }
	);

	console.log(`Stored dex #${dexNr} in Generation ${gen}`);
}

async function fetchPokemonData(dexNr: number): Promise<PokemonApiResponse | null> {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${dexNr}`);
	if (!res.ok) {
		console.error(`Failed to fetch Pokémon ${dexNr}: ${res.status} ${res.statusText}`);
		return null;
	}
	return (await res.json()) as PokemonApiResponse;
}

function resolveSpriteUrl(pokemon: PokemonApiResponse, shiny: boolean): string | null {
	const key = shiny ? 'front_shiny' : 'front_default';
	const primary = pokemon.sprites[key];
	if (primary) return primary;

	const artwork = pokemon.sprites.other?.['official-artwork'];
	if (!artwork) return null;
	return shiny ? artwork.front_shiny ?? null : artwork.front_default ?? null;
}

async function uploadSpriteAndGetUrl(sourceUrl: string, destinationPath: string): Promise<string> {
	const response = await fetch(sourceUrl);
	if (!response.ok) {
		throw new Error(`Failed to download sprite from ${sourceUrl}`);
	}

	const buffer = Buffer.from(await response.arrayBuffer());
	const file = bucket.file(destinationPath);
	await file.save(buffer, {
		contentType: response.headers.get('content-type') ?? 'image/png',
		public: false
	});

	const [signedUrl] = await file.getSignedUrl({
		action: 'read',
		expires: '03-01-2100'
	});

	return signedUrl;
}

function mapTypesToIcons(
	types: PokemonApiResponse['types']
): Array<string | undefined> {
	const orderedTypes = [...types].sort((a, b) => a.slot - b.slot).map((entry) => entry.type.name);
	return orderedTypes.map((typeName) => typeIconLookup[typeName] ?? '');
}

void (async () => {
	try {
		await main();
		console.log('Finished syncing Pokédex entries.');
	} catch (error) {
		console.error('Pokédex sync failed:', error);
		process.exit(1);
	}
})();
