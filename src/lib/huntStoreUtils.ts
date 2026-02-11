import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { get, type Writable } from 'svelte/store';
import { db } from '$lib/firebase';
import type { CombinedPokemonData } from "$lib/dex-mons";
import { currentGen, pokemonList,
         generation2, generation3, generation4, generation5, generation6, generation7,
         generation8, generation9 } from '../routes/store'; // Note: '../routes/store' might need to be adjusted based on file structure. Assuming it's correct from /src/lib

// Helper function to get the correct generation store
function getGenerationStore(generation: number): Writable<CombinedPokemonData[]> {
    const genStoreMap: Record<number, Writable<CombinedPokemonData[]>> = {
        2: generation2,
        3: generation3,
        4: generation4,
        5: generation5,
        6: generation6,
        7: generation7,
        8: generation8,
        9: generation9
    };
    const specificGenStore = genStoreMap[generation];
    if (!specificGenStore) {
        throw new Error(`Unsupported generation ${generation} in getGenerationStore helper.`);
    }
    return specificGenStore;
}

let lastSaveTimestamp = 0;
const THROTTLE_DELAY_MS = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function saveHuntToFirestore(dexNr: number, updates: Partial<CombinedPokemonData>){
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (!userId) {
        console.error("No user logged in. Cannot update hunt status.");
        return;
    }

    const userHuntRef = doc(db, `users/${userId}/pokemonHunts/${dexNr}`);
    try {
        const userHuntSnap = await getDoc(userHuntRef); // Check for existence
        if (!userHuntSnap.exists()) {
            await setDoc(userHuntRef, updates, { merge: true }); // Create if it doesn't exist
        } else {
            await updateDoc(userHuntRef, updates); // Update if it exists
        }
    }catch (error) {
        console.error(`Error updating hunt status for Pokémon/${dexNr}:`, error);
    }
    lastSaveTimestamp = Date.now();
}

export function throttledSave(dexNr: number, updates: Partial<CombinedPokemonData>){
    const now = Date.now();
    if ((now - lastSaveTimestamp) > THROTTLE_DELAY_MS) {
        saveHuntToFirestore(dexNr, updates);
    }
}
// Reusable function to update hunt status
export function updateLocalHuntState(dexNr: number, updates: Partial<CombinedPokemonData>) {  
    // Update local generation store
    try{
        const currentGenStore = getGenerationStore(get(currentGen));
        currentGenStore.update(list => {
            const index = list.findIndex(p => p.dexNr === dexNr);
            if (index !== -1) {
                list[index] = { ...list[index], ...updates };
            }
            return list;
        });

        // Update local master list
        pokemonList.update(list => {
            const index = list.findIndex(p => p.dexNr === dexNr);
            if (index !== -1) {
                list[index] = { ...list[index], ...updates };
            }
            return list;
        });
    }catch (error) {
        console.error(`Error updating hunt status for Pokémon/${dexNr}:`, error);
    }
} 

