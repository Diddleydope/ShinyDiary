<script>
    import CollectionEntry from '../CollectionEntry/+page.svelte';
    import { loggedIn, pokemonList, shinyCounter } from '../store';

    let nothingCompleted = true;
    $: nothingCompleted = !$pokemonList.some((pokemon) => pokemon.completedStatus);


</script>

<div>

    {#if nothingCompleted==true}
        <div id="kekw">You Currently have no Completed Hunts!</div>
    {:else}
        <div class="gridContainer">
            {#each $pokemonList as attribute}
                {#if attribute.completedStatus == true}
                    <CollectionEntry imageSource={attribute.shinyURL} pokemonName={attribute.name} 
                    pokedexNumber={attribute.dexNr} completedCounter={$shinyCounter[attribute.dexNr]}/>
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
        right:1.5vw;
        grid-template-columns: repeat(5, 0.5fr);
        gap: 2vh 1vw;
    }

    #kekw{
        position: absolute;
        top:20vh;
        left:40vw;
    }
</style>
