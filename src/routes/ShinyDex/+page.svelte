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
        generation7, generation8, generation9, shinyCounter, tempPokemonList, tempArray} from '../store';
    import { db } from '../+page.svelte';
    import { onMount } from 'svelte';
    import { persisted } from 'svelte-persisted-store'

    $: pokemonFilter = ""
    $tempPokemonList = [...$pokemonList];
    

    function filterPokemon(){
        let counter = 0;
        $tempArray = [];
        $pokemonList = []; //empty original list
        $pokemonList = [...$tempPokemonList]; //refill it w original content
        //$tempPokemonList = [...$pokemonList];
       for(let i = 0; i<$pokemonList.length; i++){
            if($pokemonList[i].name.includes(pokemonFilter) == true){
                $tempArray[counter] = $pokemonList[i];
                counter = counter + 1;
            }
       }
       $pokemonList = [];
       $pokemonList = [...$tempArray];
    }

    

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
        $tempPokemonList = [...$pokemonList];
    }    /*
        
    onMount(async () => {
       
        $generation2 = [];
        $generation3 = [];
        $generation4 = [];
        $generation5 = [];
        $generation6 = [];
        $generation7 = [];
        $generation8 = [];
        $generation9 = [];
         
        //for(let i = 0; i<$shinyCounter.length; i++){
        //   $shinyCounter[i] = 0;
        //}
        
        console.log($currentGen);
		loadPokemon($currentGen, $currentGenLength);
	});
*/
    //PROBLEM IS WITH DISPLAYING COUNTER ON DEX ENTRY AND IN ACTIVE HUNTS. GIVE OVER STATUS AND COUNTER
    //AS PARAMETER
    
</script>

<div>  
    {#if $loggedIn==true}
         <input type="text" class="inputbox" bind:value={pokemonFilter} placeholder="Search..." 
         on:input={filterPokemon}><input>
        <div class="gridContainer">
            {#each $pokemonList as attribute}
                <DexEntry imageSource={attribute.imgURL} pokemonName={attribute.name} 
                pokedexNumber={attribute.dexNr} pokemonStatus={attribute.active} 
                completedStatus={attribute.completedStatus} />
            {/each}
        </div>
        <div class="genbuttonz">
            <button class="genbuttons" on:click={() => loadPokemon(2, $generation2.length)}>Generation 2</button>
            <button class="genbuttons" on:click={() => loadPokemon(3, $generation3.length)}>Generation 3</button>
            <button class="genbuttons" on:click={() => loadPokemon(4, $generation4.length)}>Generation 4</button>
            <button class="genbuttons" on:click={() => loadPokemon(5, $generation5.length)}>Generation 5</button>
            <button class="genbuttons" on:click={() => loadPokemon(6, $generation6.length)}>Generation 6</button>
            <button class="genbuttons" on:click={() => loadPokemon(7, $generation7.length)}>Generation 7</button>
            <button class="genbuttons" on:click={() => loadPokemon(8, $generation8.length)}>Generation 8</button>
            <button class="genbuttons" on:click={() => loadPokemon(9, $generation9.length)}>Generation 9</button>
        
        </div>
       
    {/if}
</div>


<style>
    .inputbox{
        position: fixed;
        top:13vh;
        z-index: 2;
        height:4vh;
        width:15vw;
        left:2vw;
        border-style: solid;
        border-color: black;
        border-width: 1px;
        border-radius: 0.75rem;
    }

    .gridContainer{
    position: relative;
    top:5vh;
    display: grid;
    justify-content: center;
    align-items: center;
    right:1.05vw;
    grid-template-columns: repeat(5, 0.5fr);
    row-gap: 2vh;
}
    .genbuttons{
        position: relative;
        padding: 0;
        margin-right: 0.3vw;
        width: 11.4vw;
        height: 4vh;
        top:10vh;
        font-family: 'Permanent Marker', cursive;
        font-size: 100%;
        transition: ease-out 0.25s;
        background-color:ghostwhite;
        border-color: black;
        border-style: solid;
        border-width: 0.05vw;
        z-index: 3; /* Increase if necessary */
    }

    .genbuttons:hover{
        background-color:rosybrown;
        scale:1.05;
    }

    .genbuttonz{
        position: absolute;
        top:-1.5vh;
        display: flex;
        right: 0
    }
</style>
