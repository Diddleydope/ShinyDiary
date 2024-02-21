import {writable, readable} from "svelte/store";
import type { Attributes } from "./ShinyDex/+page.svelte";


export const loggedIn = writable(false);
export const attributeList = writable(new Array<Attributes>());
