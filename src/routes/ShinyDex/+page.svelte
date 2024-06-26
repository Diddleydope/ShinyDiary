<script context="module", lang="ts">
     export class DexMons {
        constructor(public imgURL:string, public name:string, public active:boolean, public dexNr:number){
            this.imgURL = imgURL;
            this.name = name;
            this.active = active;
            this.dexNr = dexNr;
        }
    }
    export const currentGen = persisted("currentGen", 5); 
</script>

<script lang="ts">
    import { collection, getDocs, orderBy, query } from 'firebase/firestore';
    import DexEntry from '../DexEntry/+page.svelte';
    import { loggedIn, pokemonList } from '../store';
    import { db } from '../+page.svelte';
    import { onMount } from 'svelte';
    import { persisted } from 'svelte-persisted-store'

    

    async function loadPokemon(generation:number){
            // Create a reference under which you want to list
        $currentGen = generation;
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
                const infoObj = new DexMons(doc.data().URL_Normal, doc.data().name, doc.data().active, doc.data().dexNr);
                return infoObj;
            })
        ))
        );

        $pokemonList = $pokemonList;
    }

    onMount(async () => {
		loadPokemon($currentGen);
	});
    
</script>

<div>  
    {#if $loggedIn==true}
        <div class="gridContainer">
            {#each $pokemonList as attribute}
                <DexEntry imageSource={attribute.imgURL} pokemonName={attribute.name} 
                pokedexNumber={attribute.dexNr}/>
            {/each}
        </div>
        <div id="divi">
            <div class="dropdown">
                <button class="dropbtn">Generations</button>
                    <div class="dropdown-content">
                        <button on:click={() => loadPokemon(2)}>Generation 2</button>
                        <button on:click={() => loadPokemon(3)}>Generation 3</button>
                        <button on:click={() => loadPokemon(4)}>Generation 4</button>
                        <button on:click={() => loadPokemon(5)}>Generation 5</button>
                        <button on:click={() => loadPokemon(6)}>Generation 6</button>
                        <button on:click={() => loadPokemon(7)}>Generation 7</button>
                        <button on:click={() => loadPokemon(8)}>Generation 8</button>
                        <button on:click={() => loadPokemon(9)}>Generation 9</button>
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
