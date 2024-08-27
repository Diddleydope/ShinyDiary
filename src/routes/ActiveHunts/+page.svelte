
<script lang="ts">
    import { collection, getDocs, orderBy, query } from 'firebase/firestore';
    import { loggedIn, pokemonList, generation2, generation3, generation4, generation5,
    generation6, generation7, generation8, generation9} from '../store';
    import { db } from '../+page.svelte';
    import { onMount } from 'svelte';
    import DexEntry from '../DexEntry/+page.svelte';
    import {shinyCounter} from '../store';
    import {currentGen, currentGenLength, DexMons} from '../ShinyDex/+page.svelte'

    let nothingActive = true;

    for(let i = 0; i<$pokemonList.length; i++){
        if($pokemonList[i].active==true){
            nothingActive = false;
        }
    }

    export async function loadPokemon(generation:number, pokearray:number){
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
         
        for(let i = 0; i<$shinyCounter.length; i++){
            $shinyCounter[i] = 0;
        }
        */
        console.log($currentGen);
		loadPokemon($currentGen, $currentGenLength);
	});
</script>

<div>
    {#if nothingActive==true}
        <div id="lolol">You currently have no Active Hunts!</div>
    {:else}
        <div class="gridContainer">
            {#each $pokemonList as attribute}
                {#if attribute.active == true}
                    <DexEntry imageSource={attribute.imgURL} pokemonName={attribute.name} 
                    pokedexNumber={attribute.dexNr} pokemonStatus={attribute.active} 
                    completedStatus={attribute.completedStatus}/>
                {/if}
            {/each}
        </div>
    {/if}
</div>

<style>
    .gridContainer{
        position: relative;
        top:0vh;
        display: grid;
        justify-content: center;
        align-items: center;
        right:1.05vw;
        grid-template-columns: repeat(5, 0.5fr);
        row-gap: 2vh;
}
#lolol{
    position: absolute;
    top:20vh;
    left:40vw;
}
</style>