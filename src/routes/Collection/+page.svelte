<script>
    import CollectionEntry from '../CollectionEntry/+page.svelte';
    import { loggedIn, pokemonList, shinyCounter } from '../store';


</script>

<div>
    <div class="gridContainer">
        {#each $pokemonList as attribute}
            {#if attribute.completedStatus == true}
                <CollectionEntry imageSource={attribute.shinyURL} pokemonName={attribute.name} 
                pokedexNumber={attribute.dexNr} completedCounter={$shinyCounter[attribute.dexNr]}/>
            {/if}
        {/each}
    </div>
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
</style>