import { readFileSync } from 'node:fs';
import { applicationDefault, cert, initializeApp } from 'firebase-admin/app';
import { getFirestore, type DocumentReference } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

type PokemonApiResponse = {
	id: number;
	name: string;
	sprites: {
		front_default: string | null;
		front_shiny: string | null;
		other?: {
			home?: {
				front_default: string | null;
				front_shiny: string | null;
			};
			['official-artwork']?: {
				front_default: string | null;
				front_shiny: string | null;
			};
		};
		versions?: Record<
			string,
			Record<
				string,
				{
					front_default: string | null;
					front_shiny: string | null;
				}
			>
		>;
	};
};

type GenerationRange = {
	gen: number;
	startDex: number;
	endDex: number;
};

// Update late Gen 9 entries only (newest Pokédex numbers)
const generationRanges: GenerationRange[] = [
	{ gen: 2, startDex: 1, endDex: 251 },
	{ gen: 3, startDex: 1, endDex: 386 },
	{ gen: 4, startDex: 1, endDex: 493 },
	{ gen: 5, startDex: 1, endDex: 649 },
	{ gen: 6, startDex: 1, endDex: 721 },
	{ gen: 7, startDex: 1, endDex: 809 },
	{ gen: 8, startDex: 1, endDex: 905 },
	{ gen: 9, startDex: 1, endDex: 1025 }
];
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

const generationSpriteMap: Record<number, { generationKey: string; versionKey: string }> = {
	2: { generationKey: 'generation-iii', versionKey: 'emerald' },
	3: { generationKey: 'generation-iii', versionKey: 'emerald' },
	4: { generationKey: 'generation-iv', versionKey: 'platinum' },
	5: { generationKey: 'generation-v', versionKey: 'black-white' },
	6: { generationKey: 'generation-vi', versionKey: 'omegaruby-alphasapphire' },
	7: { generationKey: 'generation-vii', versionKey: 'ultra-sun-ultra-moon' }
};

async function main() {
	for (const range of generationRanges) {
		await refreshGeneration(range);
	}
}

async function refreshGeneration(range: GenerationRange) {
	const collection = firestore
		.collection('Pokémon')
		.doc(`Generation${range.gen}`)
		.collection('Pokémon');

	console.log(`Refreshing Generation ${range.gen}`);

	for (let dexNr = range.startDex; dexNr <= range.endDex; dexNr++) {
		const docRef = collection.doc(String(dexNr));
		await refreshSprites(docRef, dexNr, range.gen);
	}
}

async function refreshSprites(docRef: DocumentReference, dexNr: number, generation: number) {
	const pokemon = await fetchPokemonData(dexNr);
	if (!pokemon) {
		return;
	}

	const normalSprite = resolveSpriteUrl(pokemon, false, generation);
	const shinySprite = resolveSpriteUrl(pokemon, true, generation);

	if (!normalSprite || !shinySprite) {
		console.warn(`Missing sprites for dex ${dexNr}, skipping.`);
		return;
	}

	const [normalUrl, shinyUrl] = await Promise.all([
		uploadSpriteAndGetUrl(
			normalSprite,
			`Pokémon/Generation${generation}/Normal/${dexNr.toString().padStart(3, '0')}.png`
		),
		uploadSpriteAndGetUrl(
			shinySprite,
			`Pokémon/Generation${generation}/Shiny/${dexNr.toString().padStart(3, '0')}.png`
		)
	]);

	await docRef.set(
		{
			URL_Normal: normalUrl,
			URL_Shiny: shinyUrl,
			dexNr,
			name: pokemon.name
		},
		{ merge: true }
	);

	console.log(`Updated sprites for dex ${dexNr}`);
}

async function fetchPokemonData(dexNr: number): Promise<PokemonApiResponse | null> {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${dexNr}`);
	if (!res.ok) {
		console.error(`Failed to fetch Pokémon ${dexNr}: ${res.status} ${res.statusText}`);
		return null;
	}
	return (await res.json()) as PokemonApiResponse;
}

function resolveSpriteUrl(
	pokemon: PokemonApiResponse,
	shiny: boolean,
	generation: number
): string | null {
	const modernSprite = getModernSprite(pokemon, shiny, generation);
	if (modernSprite) {
		return modernSprite;
	}

	const generationSprite = getGenerationSprite(pokemon, shiny, generation);
	if (generationSprite) {
		return generationSprite;
	}

	const key = shiny ? 'front_shiny' : 'front_default';
	const primary = pokemon.sprites[key];
	if (primary) return primary;

	const artwork = pokemon.sprites.other?.['official-artwork'];
	if (!artwork) return null;
	return shiny ? artwork.front_shiny ?? null : artwork.front_default ?? null;
}

function getModernSprite(
	pokemon: PokemonApiResponse,
	shiny: boolean,
	generation: number
): string | null {
	// Use modern artwork for newer gens where PokeAPI version sprites are low-res
	if (generation < 8) {
		return null;
	}

	const home = pokemon.sprites.other?.home;
	if (home) {
		const sprite = shiny ? home.front_shiny ?? null : home.front_default ?? null;
		if (sprite) {
			return sprite;
		}
	}

	const artwork = pokemon.sprites.other?.['official-artwork'];
	if (artwork) {
		return shiny ? artwork.front_shiny ?? null : artwork.front_default ?? null;
	}

	return null;
}

function getGenerationSprite(
	pokemon: PokemonApiResponse,
	shiny: boolean,
	generation: number
): string | null {
	const mapping = generationSpriteMap[generation];
	if (!mapping) {
		return null;
	}

	const generationNode = pokemon.sprites.versions?.[mapping.generationKey];
	const versionEntry = generationNode?.[mapping.versionKey];
	if (!versionEntry) {
		return null;
	}

	return shiny ? versionEntry.front_shiny ?? null : versionEntry.front_default ?? null;
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

void (async () => {
	try {
		await main();
		console.log('Finished refreshing sprites.');
	} catch (error) {
		console.error('Sprite refresh failed:', error);
		process.exit(1);
	}
})();
