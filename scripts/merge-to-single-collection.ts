import { readFileSync } from 'node:fs';
import { applicationDefault, cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

type GenerationRange = {
	gen: number;
	endDex: number;
};

type SpriteEntry = {
	generation: number;
	normalUrl: string;
	shinyUrl: string;
};

type MetadataFields = {
	name: string;
	dexNr: number;
	typing1?: string;
	typing2?: string;
	height?: number;
	weight?: number;
	description?: string;
	abilities?: unknown;
	stats?: unknown;
	hasForms?: boolean;
	hasMegas?: boolean;
	forms?: unknown;
	megaForms?: unknown;
	locations?: unknown;
	active?: boolean;
	completedStatus?: boolean;
	counter?: number;
};

const defaultBucket = 'shinydiary-91a6f.appspot.com';

const generationRanges: GenerationRange[] = [
	{ gen: 1, endDex: 151 },
	{ gen: 2, endDex: 251 },
	{ gen: 3, endDex: 386 },
	{ gen: 4, endDex: 493 },
	{ gen: 5, endDex: 649 },
	{ gen: 6, endDex: 721 },
	{ gen: 7, endDex: 809 },
	{ gen: 8, endDex: 905 },
	{ gen: 9, endDex: 1025 }
];

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

async function main() {
	for (let dexNr = 1; dexNr <= 1025; dexNr++) {
		await migrateDexEntry(dexNr);
	}
}

async function migrateDexEntry(dexNr: number) {
	try {
		const spriteEntries: SpriteEntry[] = [];
		let metadata: MetadataFields | null = null;
		let counterValue: number | undefined;

		// Prefer metadata from the highest generation that has it
		for (let i = generationRanges.length - 1; i >= 0; i--) {
			const gen = generationRanges[i].gen;
			if (dexNr > generationRanges[i].endDex) continue;

			const doc = await getGenerationDoc(gen, dexNr);
			if (!doc.exists) continue;

			const data = doc.data() ?? {};

			if (data.URL_Normal && data.URL_Shiny) {
				spriteEntries.push({
					generation: gen,
					normalUrl: data.URL_Normal,
					shinyUrl: data.URL_Shiny
				});
			}

			if (typeof data.counter === 'number' && counterValue === undefined) {
				counterValue = data.counter;
			}

			if (!metadata && hasMetadata(data)) {
				metadata = pickMetadataFields(data);
			}
		}

		if (!metadata) {
			console.warn(`No metadata found for dex #${dexNr}, skipping`);
			return;
		}

		const finalCounter = counterValue ?? metadata.counter ?? 0;
		const cleanMetadata = pruneUndefined({ ...metadata, counter: finalCounter });
	const cleanSprites = spriteEntries
		.filter((entry) => entry.normalUrl && entry.shinyUrl)
		.sort((a, b) => a.generation - b.generation);

	const targetDoc = firestore.collection('Pokémon').doc(String(dexNr));
	await targetDoc.set(
		{
			...cleanMetadata,
			sprites: cleanSprites
		},
		{ merge: true }
	);

		console.log(`Merged dex #${dexNr}`);
	} catch (error) {
		console.error(`Failed to merge dex #${dexNr}`, error);
	}
}

function getGenerationDoc(gen: number, dexNr: number) {
	return firestore
		.collection('Pokémon')
		.doc(`Generation${gen}`)
		.collection('Pokémon')
		.doc(String(dexNr))
		.get();
}

function hasMetadata(data: FirebaseFirestore.DocumentData) {
	return (
		typeof data.height === 'number' ||
		typeof data.weight === 'number' ||
		typeof data.description === 'string' ||
		Array.isArray(data.abilities) ||
		typeof data.hasForms === 'boolean' ||
		typeof data.hasMegas === 'boolean'
	);
}

function pickMetadataFields(data: FirebaseFirestore.DocumentData): MetadataFields {
	return {
		name: data.name,
		dexNr: data.dexNr,
		typing1: data.typing1,
		typing2: data.typing2,
		height: data.height,
		weight: data.weight,
		description: data.description,
		abilities: data.abilities,
		stats: data.stats,
		hasForms: data.hasForms,
		hasMegas: data.hasMegas,
		forms: data.forms,
		megaForms: data.megaForms,
		locations: data.locations,
		active: data.active,
		completedStatus: data.completedStatus,
		counter: data.counter
	};
}

function pruneUndefined<T extends Record<string, unknown>>(obj: T): Partial<T> {
	const result: Partial<T> = {};
	for (const [key, value] of Object.entries(obj)) {
		if (value !== undefined) {
			(result as Record<string, unknown>)[key] = value;
		}
	}
	return result;
}

void (async () => {
	try {
		await main();
		console.log('Finished merging Pokémon into single collection');
	} catch (error) {
		console.error('Merge failed:', error);
		process.exit(1);
	}
})();
