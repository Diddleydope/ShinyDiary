import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { get, type Writable } from 'svelte/store';
import { db } from '$lib/firebase';
import { DexMons } from '$lib/dex-mons';
import {
	currentGen,
	currentGenLength,
	generation2,
	generation3,
	generation4,
	generation5,
	generation6,
	generation7,
	generation8,
	generation9,
	pokemonList,
	shinyCounter,
	tempPokemonList
} from '../routes/store';

const generationStores: Record<number, Writable<DexMons[]>> = {
	2: generation2,
	3: generation3,
	4: generation4,
	5: generation5,
	6: generation6,
	7: generation7,
	8: generation8,
	9: generation9
};

function getGenerationStore(generation: number): Writable<DexMons[]> {
	const store = generationStores[generation];
	if (!store) {
		throw new Error(`Unsupported generation ${generation}`);
	}
	return store;
}

export async function loadPokemon(generation: number, cachedLength = 0): Promise<void> {
	currentGen.set(generation);
	const generationStore = getGenerationStore(generation);
	const cachedList = get(generationStore);
	const shouldFetch = cachedLength === 0 || cachedList.length === 0;

	if (shouldFetch) {
		const storageRef = collection(db, `Pokémon/Generation${generation}/Pokémon`);
		const q = query(storageRef, orderBy('dexNr', 'asc'));
		const querySnapshot = await getDocs(q);
		const counters = get(shinyCounter);

		const loadedList = querySnapshot.docs.map((doc) => {
			const data = doc.data();
			return new DexMons(
				data.URL_Normal,
				data.name,
				data.active,
				data.dexNr,
				data.URL_Shiny,
				counters[data.dexNr],
				data.completedStatus
			);
		});

		pokemonList.set(loadedList);
		generationStore.set(loadedList);
		currentGenLength.set(loadedList.length);
	} else {
		pokemonList.set(cachedList);
		currentGenLength.set(cachedList.length);
	}

	const listForFilter = get(pokemonList);
	tempPokemonList.set([...listForFilter]);
}
