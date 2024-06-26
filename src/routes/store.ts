import {writable, readable} from "svelte/store";
import type { DexMons } from "./ShinyDex/+page.svelte";



export const loggedIn = writable(false);
export const pokemonList = writable(new Array<DexMons>());
export const showComponent = writable(false);
export const currentHuntScreen = writable(new Array<string>());
export const counter = writable(0);