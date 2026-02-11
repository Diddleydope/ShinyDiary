import { writable } from 'svelte/store';
import type { DexMons, CombinedPokemonData } from '../lib/dex-mons';
import { persisted } from 'svelte-persisted-store';

export const loggedIn = writable(false);
export const openSidebar = writable(false);
export const shinyDex = writable(false);
export const pokemonList = writable(new Array<CombinedPokemonData>());
export const tempPokemonList = writable(new Array<CombinedPokemonData>());
export const tempArray = writable(new Array<CombinedPokemonData>());
export const showComponent = writable(false);
export const currentHuntScreen = writable<CombinedPokemonData | null>(null);
// export const counter = writable(0); // Removed as counter is now per-pokemon in UserPokemonHunt
// export const shinyCounter = persisted('counters', new Array<number>(1000)); // Removed as counters are now in Firestore
export const currentGen = persisted('currentGen', 5);
export const currentGenLength = persisted('currentGenLength', 0);
export const generation2 = persisted('genTwo', new Array<CombinedPokemonData>()); //252
export const generation3 = persisted('genThree', new Array<CombinedPokemonData>()); //387
export const generation4 = persisted('genFour', new Array<CombinedPokemonData>()); //494
export const generation5 = persisted('genFive', new Array<CombinedPokemonData>()); //650
export const generation6 = persisted('genSix', new Array<CombinedPokemonData>()); //722
export const generation7 = persisted('genSeven', new Array<CombinedPokemonData>()); //810
export const generation8 = persisted('genEight', new Array<CombinedPokemonData>()); //906
export const generation9 = persisted('genNine_v2', new Array<CombinedPokemonData>()); //1000
export const incrementKeybind = writable('TAB');
export const incrementAmount = writable(1);
//EMPTY THESE ON APP CLOSE!!!
