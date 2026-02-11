export class DexMons {
	constructor(
		public imgURL: string,
		public name: string,
		public dexNr: number,
		public shinyURL: string
	) {
		this.imgURL = imgURL;
		this.name = name;
		this.dexNr = dexNr;
		this.shinyURL = shinyURL;
	}
}

export interface UserPokemonHunt {
    dexNr: number;
    active: boolean;
    completedStatus: boolean;
    counter: number;
}

export interface CombinedPokemonData extends DexMons, UserPokemonHunt {}
