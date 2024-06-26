
<script lang="ts">
    import { collection, getDocs, orderBy, query } from 'firebase/firestore';
    import { loggedIn, pokemonList } from '../store';
    import { db } from '../+page.svelte';
    import { onMount } from 'svelte';
    import DexEntry from '../DexEntry/+page.svelte';

</script>

<div>
    <div class="gridContainer">
        {#each $pokemonList as attribute}
            {#if attribute.active == true}
                <DexEntry imageSource={attribute.imgURL} pokemonName={attribute.name} 
                pokedexNumber={attribute.dexNr}/>
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