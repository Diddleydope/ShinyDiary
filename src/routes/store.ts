import { writable } from 'svelte/store';
import type { DexMons } from '../lib/dex-mons';
import { persisted } from 'svelte-persisted-store';

export const loggedIn = writable(false);
export const openSidebar = writable(false);
export const shinyDex = writable(false);
export const pokemonList = writable(new Array<DexMons>());
export const tempPokemonList = writable(new Array<DexMons>());
export const tempArray = writable(new Array<DexMons>());
export const showComponent = writable(false);
export const currentHuntScreen = writable(new Array<any>());
export const counter = writable(0);
export const shinyCounter = persisted('counters', new Array<number>(1000));
export const currentGen = persisted('currentGen', 5);
export const currentGenLength = persisted('currentGenLength', 0);
export const generation2 = persisted('genTwo', new Array<DexMons>()); //252
export const generation3 = persisted('genThree', new Array<DexMons>()); //387
export const generation4 = persisted('genFour', new Array<DexMons>()); //494
export const generation5 = persisted('genFive', new Array<DexMons>()); //650
export const generation6 = persisted('genSix', new Array<DexMons>()); //722
export const generation7 = persisted('genSeven', new Array<DexMons>()); //810
export const generation8 = persisted('genEight', new Array<DexMons>()); //906
export const generation9 = persisted('genNine', new Array<DexMons>()); //1000
export const incrementKeybind = writable('TAB');
export const incrementAmount = writable(1);
//EMPTY THESE ON APP CLOSE!!!
