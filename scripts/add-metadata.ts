import { readFileSync } from 'node:fs';
import { applicationDefault, cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

type NamedAPIResource = {
	name: string;
	url: string;
};

type PokemonAbility = {
	is_hidden: boolean;
	slot: number;
	ability: NamedAPIResource;
};

type PokemonStat = {
	base_stat: number;
	effort: number;
	stat: NamedAPIResource;
};

type PokemonApiResponse = {
	id: number;
	name: string;
	height: number;
	weight: number;
	abilities: PokemonAbility[];
	stats: PokemonStat[];
	forms: NamedAPIResource[];
};

type PokemonSpeciesResponse = {
	flavor_text_entries: Array<{
		flavor_text: string;
		language: NamedAPIResource;
		version: NamedAPIResource;
	}>;
	varieties: Array<{
		is_default: boolean;
		pokemon: NamedAPIResource;
	}>;
};

type PokemonFormType = {
	slot: number;
	type: NamedAPIResource;
};

type PokemonFormSprites = {
	front_default: string | null;
	front_shiny: string | null;
};

type PokemonFormResponse = {
	name: string;
	is_default: boolean;
	is_battle_only: boolean;
	is_mega: boolean;
	form_name: string | null;
	types: PokemonFormType[];
	sprites: PokemonFormSprites;
};

type Encounter = {
	min_level: number;
	max_level: number;
	condition_values: NamedAPIResource[];
	chance: number;
	method: NamedAPIResource;
};

type VersionEncounterDetail = {
	version: NamedAPIResource;
	max_chance: number;
	encounter_details: Encounter[];
};

type PokemonLocationArea = {
	location_area: NamedAPIResource;
	version_details: VersionEncounterDetail[];
};

type GenerationRange = {
	gen: number;
	startDex: number;
	endDex: number;
};

type StoredForm = {
	name: string;
	formName: string;
	isDefault: boolean;
	isBattleOnly: boolean;
	types: string[];
	spriteNormalUrl: string | null;
	spriteShinyUrl: string | null;
};

type StoredStats = {
	hp: number | null;
	attack: number | null;
	defense: number | null;
	specialAttack: number | null;
	specialDefense: number | null;
	speed: number | null;
};

type StoredLocation = {
	locationArea: string;
	versions: Array<{
		version: string;
		maxChance: number;
		encounters: Array<{
			method: string;
			minLevel: number;
			maxLevel: number;
			chance: number;
			conditionValues: string[];
		}>;
	}>;
};

type StoredLocationsByGeneration = {
	generation: number;
	encounters: StoredLocation[];
};

const defaultBucket = 'shinydiary-91a6f.appspot.com';

const generationRanges: GenerationRange[] = [
	{ gen: 1, startDex: 1, endDex: 151 },
	{ gen: 2, startDex: 1, endDex: 251 },
	{ gen: 3, startDex: 1, endDex: 386 },
	{ gen: 4, startDex: 1, endDex: 493 },
	{ gen: 5, startDex: 1, endDex: 649 },
	{ gen: 6, startDex: 1, endDex: 721 },
	{ gen: 7, startDex: 1, endDex: 809 },
	{ gen: 8, startDex: 1, endDex: 905 },
	{ gen: 9, startDex: 1, endDex: 1025 }
];

const versionToGeneration: Record<string, number> = {
	red: 1,
	blue: 1,
	yellow: 1,
	gold: 2,
	silver: 2,
	crystal: 2,
	ruby: 3,
	sapphire: 3,
	emerald: 3,
	firered: 3,
	leafgreen: 3,
	diamond: 4,
	pearl: 4,
	platinum: 4,
	heartgold: 4,
	soulsilver: 4,
	black: 5,
	white: 5,
	'black-2': 5,
	'white-2': 5,
	x: 6,
	y: 6,
	'omega-ruby': 6,
	'alpha-sapphire': 6,
	sun: 7,
	moon: 7,
	'ultra-sun': 7,
	'ultra-moon': 7,
	'lets-go-pikachu': 7,
	'lets-go-eevee': 7,
	sword: 8,
	shield: 8,
	'brilliant-diamond': 8,
	'shining-pearl': 8,
	'legends-arceus': 8,
	scarlet: 9,
	violet: 9
};

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
		await processGeneration(range);
	}
}

async function processGeneration(range: GenerationRange) {
	console.log(`Processing Generation ${range.gen}`);
	const collection = firestore
		.collection('Pokémon')
		.doc(`Generation${range.gen}`)
		.collection('Pokémon');

	for (let dexNr = range.startDex; dexNr <= range.endDex; dexNr++) {
		const docRef = collection.doc(String(dexNr));
		await processPokemon(docRef, dexNr, range.gen);
	}
}

async function processPokemon(docRef: FirebaseFirestore.DocumentReference, dexNr: number, gen: number) {
	try {
		const pokemon = await fetchPokemon(dexNr);
		if (!pokemon) {
			console.warn(`Skipping dex #${dexNr} - Pokémon data missing`);
			return;
		}

		// Only need species for form discovery (varieties) when doing a forms-only run.
		const species = await fetchPokemonSpecies(dexNr);
		// const [species, locations] = await Promise.all([
		// 	fetchPokemonSpecies(dexNr),
		// 	fetchPokemonEncounters(dexNr)
		// ]);

		// const description = extractEnglishDescription(species);
		// const abilities = mapAbilities(pokemon.abilities);
		// const stats = mapStats(pokemon.stats);

		const formResources = collectFormResources(pokemon.forms, species);
		const { forms, megaForms } = await fetchFormsWithSprites(formResources, dexNr, gen);
		// const locationsByGen = groupLocationsByGeneration(locations);

		// Forms-only update to avoid rewriting existing metadata unnecessarily.
		await docRef.set(
			{
				forms,
				megaForms,
				hasForms: forms.length > 1,
				hasMegas: megaForms.length > 0
				// height: pokemon.height,
				// weight: pokemon.weight,
				// description,
				// abilities,
				// stats,
				// locations: locationsByGen
			},
			{ merge: true }
		);

		console.log(`Updated metadata for dex #${dexNr} (Gen ${gen})`);
	} catch (error) {
		console.error(`Failed to update dex #${dexNr}`, error);
	}
}

function collectFormResources(
	pokemonForms: NamedAPIResource[],
	species: PokemonSpeciesResponse
): NamedAPIResource[] {
	const resources: NamedAPIResource[] = [];
	const seen = new Set<string>();

	for (const form of pokemonForms) {
		if (seen.has(form.name)) continue;
		seen.add(form.name);
		// pokemon.forms entries already point to pokemon-form URLs
		resources.push(form);
	}

	for (const variety of species.varieties) {
		const name = variety.pokemon.name;
		if (seen.has(name)) continue;
		seen.add(name);
		resources.push({
			name,
			url: `https://pokeapi.co/api/v2/pokemon-form/${name}`
		});
	}

	return resources;
}

async function fetchPokemon(dexNr: number): Promise<PokemonApiResponse | null> {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${dexNr}`);
	if (!res.ok) {
		console.error(`Failed to fetch Pokémon ${dexNr}: ${res.status} ${res.statusText}`);
		return null;
	}
	return (await res.json()) as PokemonApiResponse;
}

async function fetchPokemonSpecies(dexNr: number): Promise<PokemonSpeciesResponse> {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${dexNr}`);
	if (!res.ok) {
		throw new Error(`Failed to fetch species ${dexNr}: ${res.status} ${res.statusText}`);
	}
	return (await res.json()) as PokemonSpeciesResponse;
}

async function fetchPokemonEncounters(dexNr: number): Promise<PokemonLocationArea[]> {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${dexNr}/encounters`);
	if (!res.ok) {
		throw new Error(`Failed to fetch encounters for ${dexNr}: ${res.status} ${res.statusText}`);
	}
	return (await res.json()) as PokemonLocationArea[];
}

function extractEnglishDescription(species: PokemonSpeciesResponse): string {
	const englishEntries = species.flavor_text_entries.filter((entry) => entry.language.name === 'en');
	if (englishEntries.length === 0) {
		return '';
	}

	const latest = englishEntries[englishEntries.length - 1];
	return latest.flavor_text.replace(/\s+/g, ' ').trim();
}

function mapAbilities(abilities: PokemonAbility[]) {
	return [...abilities]
		.sort((a, b) => a.slot - b.slot)
		.map((ability) => ({
			name: ability.ability.name,
			isHidden: ability.is_hidden
		}));
}

function mapStats(stats: PokemonStat[]): StoredStats {
	const mapped: StoredStats = {
		hp: null,
		attack: null,
		defense: null,
		specialAttack: null,
		specialDefense: null,
		speed: null
	};

	const keyMap: Record<string, keyof StoredStats> = {
		hp: 'hp',
		attack: 'attack',
		defense: 'defense',
		'special-attack': 'specialAttack',
		'special-defense': 'specialDefense',
		speed: 'speed'
	};

	for (const stat of stats) {
		const key = keyMap[stat.stat.name];
		if (key) {
			mapped[key] = stat.base_stat;
		}
	}

	return mapped;
}

async function fetchFormsWithSprites(
	formResources: NamedAPIResource[],
	dexNr: number,
	gen: number
): Promise<{ forms: StoredForm[]; megaForms: StoredForm[] }> {
	const forms: StoredForm[] = [];
	const megaForms: StoredForm[] = [];

	for (const resource of formResources) {
		const form = await fetchPokemonForm(resource.url);
		const stored = await buildStoredForm(form, dexNr, gen);
		if (!stored) continue;

		if (form.is_mega) {
			megaForms.push(stored);
		} else {
			forms.push(stored);
		}
	}

	const sortByDefault = (a: StoredForm, b: StoredForm) => Number(b.isDefault) - Number(a.isDefault);
	forms.sort(sortByDefault);
	megaForms.sort(sortByDefault);

	return { forms, megaForms };
}

async function fetchPokemonForm(url: string): Promise<PokemonFormResponse> {
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`Failed to fetch form ${url}: ${res.status} ${res.statusText}`);
	}
	return (await res.json()) as PokemonFormResponse;
}

async function buildStoredForm(
	form: PokemonFormResponse,
	dexNr: number,
	gen: number
): Promise<StoredForm | null> {
	const normalSprite = form.sprites.front_default;
	const shinySprite = form.sprites.front_shiny;

	if (!normalSprite) {
		console.warn(`Missing form sprite for ${form.name}, skipping form entry.`);
		return null;
	}

	const sanitized = sanitizeFormName(form.form_name || form.name);
	const paddedDex = String(dexNr).padStart(3, '0');
	const basePath = form.is_mega
		? `Pokémon/Generation${gen}/Megas/${paddedDex}-${sanitized}`
		: `Pokémon/Generation${gen}/Forms/${paddedDex}-${sanitized}`;

	const [normalUrl, shinyUrl] = await Promise.all([
		uploadSpriteAndGetUrl(normalSprite, `${basePath}-normal.png`),
		shinySprite ? uploadSpriteAndGetUrl(shinySprite, `${basePath}-shiny.png`) : Promise.resolve(null)
	]);

	const types = [...form.types].sort((a, b) => a.slot - b.slot).map((t) => t.type.name);

	return {
		name: form.name,
		formName: form.form_name ?? '',
		isDefault: form.is_default,
		isBattleOnly: form.is_battle_only,
		types,
		spriteNormalUrl: normalUrl,
		spriteShinyUrl: shinyUrl
	};
}

function sanitizeFormName(name: string) {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '') || 'default';
}

function groupLocationsByGeneration(encounters: PokemonLocationArea[]): StoredLocationsByGeneration[] {
	const byGeneration = new Map<number, Map<string, StoredLocation>>();

	for (const area of encounters) {
		for (const versionDetail of area.version_details) {
			const versionName = versionDetail.version.name;
			const generation = versionToGeneration[versionName];
			if (!generation) continue;

			if (!byGeneration.has(generation)) {
				byGeneration.set(generation, new Map());
			}

			const locationKey = area.location_area.name;
			const locationMap = byGeneration.get(generation)!;
			if (!locationMap.has(locationKey)) {
				locationMap.set(locationKey, {
					locationArea: locationKey,
					versions: []
				});
			}

			locationMap.get(locationKey)!.versions.push({
				version: versionName,
				maxChance: versionDetail.max_chance,
				encounters: versionDetail.encounter_details.map((enc) => ({
					method: enc.method.name,
					minLevel: enc.min_level,
					maxLevel: enc.max_level,
					chance: enc.chance,
					conditionValues: enc.condition_values.map((c) => c.name)
				}))
			});
		}
	}

	return Array.from(byGeneration.entries())
		.sort(([a], [b]) => a - b)
		.map(([generation, locations]) => ({
			generation,
			encounters: Array.from(locations.values()).sort((a, b) =>
				a.locationArea.localeCompare(b.locationArea)
			)
		}));
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
		console.log('Finished updating Pokémon metadata.');
	} catch (error) {
		console.error('Metadata update failed:', error);
		process.exit(1);
	}
})();
