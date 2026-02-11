<script lang="ts">

    import DexEntry from '../DexEntry/+page.svelte';
    import { loggedIn, pokemonList, generation2,
        generation3,generation4,generation5, generation6,
        generation7, generation8, generation9, tempPokemonList, tempArray, currentGen, currentGenLength} from '../store';
    import { loadPokemon } from '$lib/pokemon-loader';
    import {onMount} from 'svelte';
    import type { CombinedPokemonData } from '$lib/dex-mons';
    

   let pokemonFilter = "";
   let originalPokemonList: CombinedPokemonData[] = [];

    onMount(() => {
        $tempPokemonList = [...$pokemonList];
    });

    $: if ($pokemonList.length > 0 && originalPokemonList.length === 0) {
        originalPokemonList = [...$pokemonList];
    }

   function filterPokemon(){
       if(pokemonFilter.trim() === ""){
            pokemonList.set([...originalPokemonList]);
       }else{
        const filteredResults = originalPokemonList.filter(pokemon =>
            pokemon.name.toLowerCase().includes(pokemonFilter.toLowerCase())
        );
        pokemonList.set(filteredResults);
       }
   }
</script>


<div>  
   {#if $loggedIn==true}
        <div class="shinyDexToolbar">
            <details class="spriteDropdown">
                <summary>Sprites</summary>
                <div class="dropdownContent">
                    <button class="genbuttons" on:click={() => loadPokemon(2,  $generation2.length)}>Generation 2</button>
                    <button class="genbuttons" on:click={() => loadPokemon(3,  $generation3.length)}>Generation 3</button>
                    <button class="genbuttons" on:click={() => loadPokemon(4,  $generation4.length)}>Generation 4</button>
                    <button class="genbuttons" on:click={() => loadPokemon(5,  $generation5.length)}>Generation 5</button>
                    <button class="genbuttons" on:click={() => loadPokemon(6,  $generation6.length)}>Generation 6</button>
                    <button class="genbuttons" on:click={() => loadPokemon(7,  $generation7.length)}>Generation 7</button>
                    <button class="genbuttons" on:click={() => loadPokemon(8,  $generation8.length)}>Generation 8</button>
                    <button class="genbuttons" on:click={() => loadPokemon(9,  $generation9.length)}>Generation 9</button>
                </div>
            </details>
            <input type="text" class="inputbox" bind:value={pokemonFilter} placeholder="Search..." on:input={filterPokemon}>
        </div>
       <div class="gridContainer">
           {#each $pokemonList as pokemon}
                <DexEntry pokemon={pokemon} />
           {/each}
       </div>
      
   {/if}
</div>


<style>
   .shinyDexToolbar{
       position: fixed;
       top: 1.2vw;
       right: 2vw;
       display: flex;
       align-items: center;
       gap: 1rem;
       z-index: 1501;
   }

   .spriteDropdown{
       position: relative;
   }

   .spriteDropdown summary{
       list-style: none;
       background-color: ghostwhite;
       border: 0.05vw solid black;
       border-radius: 0.75rem;
       padding: 0.6rem 1.5rem;
       font-family: 'Permanent Marker', cursive;
       cursor: pointer;
       user-select: none;
   }

   .spriteDropdown summary::-webkit-details-marker{
       display: none;
   }

   .dropdownContent{
       position: absolute;
       top: calc(100% + 0.5rem);
       right: 0;
       display: flex;
       flex-direction: column;
       background-color: ghostwhite;
       border: 0.05vw solid black;
       border-radius: 0.75rem;
       padding: 0.75rem;
       gap: 0.5rem;
       width: 14vw;
       box-shadow: 0 0.35rem 0.6rem rgba(0,0,0,0.15);
       z-index: 1502;
   }

   .spriteDropdown:not([open]) .dropdownContent{
       display: none;
   }

   .inputbox{
       height: 2.8vw;
       width: 15vw;
       border-style: solid;
       border-color: black;
       border-width: 1px;
       border-radius: 0.75rem;
       background-color: ghostwhite;
       padding: 0 0.75rem;
   }

   .gridContainer{
   position: relative;
   top:0vh;
   display: grid;
   justify-content: center;
   align-items: center;
   grid-template-columns: repeat(5, 0.5fr);
   gap: 2vh 1vw;
}
   .genbuttons{
       padding: 0.4rem 0.5rem;
       width: 100%;
       font-family: 'Permanent Marker', cursive;
       font-size: 1rem;
       transition: ease-out 0.25s;
       background-color:ghostwhite;
       border-color: black;
       border-style: solid;
       border-width: 0.05vw;
       border-radius: 0.5rem;
   }

   .genbuttons:hover{
       background-color:rosybrown;
       scale:1.0;
   }
</style>
