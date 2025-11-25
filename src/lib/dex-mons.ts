export class DexMons {
	constructor(
		public imgURL: string,
		public name: string,
		public active: boolean,
		public dexNr: number,
		public shinyURL: string,
		public uniqueCounter: number,
		public completedStatus: boolean
	) {
		this.imgURL = imgURL;
		this.name = name;
		this.active = active;
		this.dexNr = dexNr;
		this.shinyURL = shinyURL;
		this.uniqueCounter = uniqueCounter;
		this.completedStatus = completedStatus;
	}
}
