import {writable, readable} from "svelte/store";
import type { DexMons } from "./ShinyDex/+page.svelte";
import { persisted } from "svelte-persisted-store";



export const loggedIn = writable(false);
export const pokemonList = writable(new Array<DexMons>());
export const showComponent = writable(false);
export const currentHuntScreen = writable(new Array<any>());
export const counter = writable(0);
export const shinyCounter = persisted("counters", new Array<number>(1000)); 