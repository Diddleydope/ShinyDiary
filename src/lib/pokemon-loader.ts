import { collection, getDocs, orderBy, query, where, doc, getDoc, setDoc } from 'firebase/firestore';
import { get, type Writable } from 'svelte/store';
import { db } from '$lib/firebase';
import { DexMons } from '$lib/dex-mons'; // Class import
import type { UserPokemonHunt, CombinedPokemonData } from '$lib/dex-mons'; // Type-only imports
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
    tempPokemonList
} from '../routes/store';
import { getAuth } from 'firebase/auth'; // Import getAuth

const generationStores: Record<number, Writable<CombinedPokemonData[]>> = {
    2: generation2,
    3: generation3,
    4: generation4,
    5: generation5,
    6: generation6,
    7: generation7,
    8: generation8,
    9: generation9
};

// Define dexNr ranges for each generation
const generationRanges: Record<number, { start: number; end: number }> = {
    1: { start: 1, end: 151 },
    2: { start: 152, end: 251 },
    3: { start: 252, end: 386 },
    4: { start: 387, end: 493 },
    5: { start: 494, end: 649 },
    6: { start: 650, end: 721 },
    7: { start: 722, end: 809 },
    8: { start: 810, end: 905 },
    9: { start: 906, end: 1025 },
};

function getGenerationStore(generation: number): Writable<CombinedPokemonData[]> {
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
        const auth = getAuth();
        const userId = auth.currentUser?.uid;

        if (!userId) {
            console.warn("No user logged in. Cannot load user-specific hunt data.");
            return;
        }

        const range = generationRanges[generation];
        if (!range) {
            console.error(`No dexNr range defined for generation ${generation}`);
            return;
        }

        const storageRef = collection(db, `Pokémon/Generation${generation}/Pokémon`);
        const q = query(
            storageRef,
            orderBy('dexNr', 'asc')
        );
        const querySnapshot = await getDocs(q);

        const loadedListPromises = querySnapshot.docs.map(async (docSnapshot) => {
            const staticData = docSnapshot.data();
            const dexNr = staticData.dexNr;

            const userHuntRef = doc(db, `users/${userId}/pokemonHunts/${dexNr}`);
            const userHuntSnap = await getDoc(userHuntRef);

            let userHuntData: UserPokemonHunt;

            if (!userHuntSnap.exists()) {
                // If user hunt data doesn't exist, initialize with defaults in memory only
                userHuntData = {
                    dexNr: dexNr,
                    active: false,
                    completedStatus: false,
                    counter: 0,
                };
            } else {
                userHuntData = userHuntSnap.data() as UserPokemonHunt;
            }

            const dexMonsInstance = new DexMons(
                staticData.URL_Normal,
                staticData.name,
                staticData.dexNr,
                staticData.URL_Shiny
            );

            return {
                ...dexMonsInstance,
                ...userHuntData
            } as CombinedPokemonData;
        });

        const loadedList = await Promise.all(loadedListPromises);

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