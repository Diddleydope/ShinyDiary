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
        top:0vh;
        display: grid;
        justify-content: center;
        align-items: center;
        right:1.05vw;
        grid-template-columns: repeat(5, 0.5fr);
        row-gap: 2vh;
    }
</style>