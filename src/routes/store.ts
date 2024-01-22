import {writable, readable} from "svelte/store";

export const loggedIn = writable(false);
export const gen = writable(5);