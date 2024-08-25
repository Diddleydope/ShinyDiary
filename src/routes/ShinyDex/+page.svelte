<script context="module", lang="ts">
     export class DexMons {
        constructor(public imgURL:string, public name:string, public active:boolean, public dexNr:number, 
                    public shinyURL:string, public uniqueCounter:number, public completedStatus:boolean){
            this.imgURL = imgURL;
            this.name = name;
            this.active = active;
            this.dexNr = dexNr;
            this.shinyURL = shinyURL;
            this.uniqueCounter = uniqueCounter;
            this.completedStatus = completedStatus;
            }
    }
    export const currentGen = persisted("currentGen", 5); 
    export const currentGenLength = persisted("currentGenLength", 0);

    
</script>

<script lang="ts">
    import { collection, getDocs, orderBy, query } from 'firebase/firestore';
    import DexEntry from '../DexEntry/+page.svelte';
    import { loggedIn, pokemonList, generation2,
        generation3,generation4,generation5, generation6,
        generation7, generation8, generation9, shinyCounter} from '../store';
    import { db } from '../+page.svelte';
    import { onMount } from 'svelte';
    import { persisted } from 'svelte-persisted-store'
    
    

    async function loadPokemon(generation:number, pokearray:number){
        $currentGen = generation;
        if(pokearray==0){
            console.log(pokearray)
            // Create a reference under which you want to list
            
            const storageRef = collection(db, 'Pokémon/Generation' + generation + '/Pokémon');
            const q = query(storageRef, orderBy("dexNr", "asc"));
            const querySnapshot = await getDocs(q);


            /* let temp = await Promise.all(
                    querySnapshot.docs.map(async (doc) => {
                        const infoObj = new Attributes(doc.data().URL_Normal, doc.data().name);
                        return infoObj;
                    }));

            $attributeList = [...$attributeList, temp];*/
            $pokemonList = [];
            
            $pokemonList.push(
            ...(await Promise.all(
                querySnapshot.docs.map(async (doc) => {
                    const infoObj = new DexMons(doc.data().URL_Normal, doc.data().name, 
                                                doc.data().active, doc.data().dexNr, doc.data().URL_Shiny,
                                                $shinyCounter[doc.data().dexNr], doc.data().completedStatus);
                    return infoObj;
                })
            ))
            );

            $pokemonList = $pokemonList;        
            if(generation == 2){
                $generation2 = [];
                $generation2 = $pokemonList;
                $currentGenLength = $generation2.length;
            }else if(generation == 3){
                $generation3 = [];
                $generation3 = $pokemonList;
                $currentGenLength = $generation3.length;
            }else if(generation == 4){
                $generation4 = [];
                $generation4 = $pokemonList;
                $currentGenLength = $generation4.length;
            }
            else if(generation == 5){
                $generation5 = [];
                $generation5 = $pokemonList;
                $currentGenLength = $generation5.length;
            }else if(generation == 6){
                $generation6 = [];
                $generation6 = $pokemonList;
                $currentGenLength = $generation6.length;
            }else if(generation == 7){
                $generation7 = [];
                $generation7 = $pokemonList;
                $currentGenLength = $generation7.length;
            }else if(generation == 8){
                $generation8 = [];
                $generation8 = $pokemonList;
                $currentGenLength = $generation8.length;
            }else if(generation == 9){
                $generation9 = [];
                $generation9 = $pokemonList;
                $currentGenLength = $generation9.length;
            }
        

        }
        else{
            console.log(pokearray);
            $pokemonList = [];
            if(generation==2){
                $pokemonList = $generation2;
                $currentGenLength = $generation2.length;
            }else if(generation==3){
                $pokemonList = $generation3;
                $currentGenLength = $generation3.length;
            }else if(generation==4){
                $pokemonList = $generation4;
                $currentGenLength = $generation4.length;
            }else if(generation==5){
                $pokemonList = $generation5;
                $currentGenLength = $generation5.length;
            }else if(generation==6){
                $pokemonList = $generation6;
                $currentGenLength = $generation6.length;
            }else if(generation==7){
                $pokemonList = $generation7;
                $currentGenLength = $generation7.length;
            }else if(generation==8){
                $pokemonList = $generation8;
                $currentGenLength = $generation8.length;
            }else if(generation==9){
                $pokemonList = $generation9;
                $currentGenLength = $generation9.length;
            }
        }
    }   
    onMount(async () => {
        /*
        $generation2 = [];
        $generation3 = [];
        $generation4 = [];
        $generation5 = [];
        $generation6 = [];
        $generation7 = [];
        $generation8 = [];
        $generation9 = [];
        */
        console.log($currentGen);
		loadPokemon($currentGen, $currentGenLength);
	});

    //PROBLEM IS WITH DISPLAYING COUNTER ON DEX ENTRY AND IN ACTIVE HUNTS. GIVE OVER STATUS AND COUNTER
    //AS PARAMETER
    
</script>

<div>  
    {#if $loggedIn==true}
        <div class="gridContainer">
            {#each $pokemonList as attribute}
                <DexEntry imageSource={attribute.imgURL} pokemonName={attribute.name} 
                pokedexNumber={attribute.dexNr} pokemonStatus={attribute.active} 
                completedStatus={attribute.completedStatus} />
            {/each}
        </div>
        <div id="divi">
            <div class="dropdown">
                <button class="dropbtn">Generations</button>
                    <div class="dropdown-content">
                        <button on:click={() => loadPokemon(2, $generation2.length)}>Generation 2</button>
                        <button on:click={() => loadPokemon(3, $generation3.length)}>Generation 3</button>
                        <button on:click={() => loadPokemon(4, $generation4.length)}>Generation 4</button>
                        <button on:click={() => loadPokemon(5, $generation5.length)}>Generation 5</button>
                        <button on:click={() => loadPokemon(6, $generation6.length)}>Generation 6</button>
                        <button on:click={() => loadPokemon(7, $generation7.length)}>Generation 7</button>
                        <button on:click={() => loadPokemon(8, $generation8.length)}>Generation 8</button>
                        <button on:click={() => loadPokemon(9, $generation9.length)}>Generation 9</button>
                    </div>
              </div> 
        </div>
    {/if}
</div>


<style>
    .gridContainer{
    position: relative;
    top:5vh;
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: repeat(5, 1fr);
    row-gap: 3vh;
}
    #divi{
        position: absolute;
        top:10vh;
        left:2vw;
    }

    .dropbtn {
    background-color: grey;
    color: white;
    padding: 11px;
    font-size: 16px;
    border: none;
}

    /* The container <div> - needed to position the dropdown content */
    .dropdown {
    position: relative;
    display: inline-block;
    left:80vw;
    }

    /* Dropdown Content (Hidden by Default) */
    .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 120px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    }

    /* Links inside the dropdown */
    .dropdown-content button {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    }

    /* Change color of dropdown links on hover */
    .dropdown-content button:hover {background-color: #ddd;}

    /* Show the dropdown menu on hover */
    .dropdown:hover .dropdown-content {display: block;}

    /* Change the background color of the dropdown button when the dropdown content is shown */
    .dropdown:hover .dropbtn {background-color: #3e8e41;}
</style>
