
<script lang="ts">
    import { collection, getDocs, orderBy, query } from 'firebase/firestore';
    import { loggedIn, pokemonList } from '../store';
    import { db } from '../+page.svelte';
    import { onMount } from 'svelte';
    import DexEntry from '../DexEntry/+page.svelte';
    import {shinyCounter} from '../store';

</script>

<div>
    <div class="gridContainer">
        {#each $pokemonList as attribute}
            {#if attribute.active == true}
                <DexEntry imageSource={attribute.imgURL} pokemonName={attribute.name} 
                pokedexNumber={attribute.dexNr} pokemonStatus={attribute.active} 
                completedStatus={attribute.completedStatus}/>
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