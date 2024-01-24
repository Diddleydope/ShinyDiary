import {writable, readable} from "svelte/store";
import type { Attributes } from "./DexEntry/+page.svelte";


export const loggedIn = writable(false);
export const gen = writable(2);
export const attributeList = writable(new Array<Attributes>());
