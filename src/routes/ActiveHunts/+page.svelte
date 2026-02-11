
<script lang="ts">
    import { pokemonList, currentGen, currentGenLength} from '../store';
    import { onMount } from 'svelte';
    import DexEntry from '../DexEntry/+page.svelte';
    import { loadPokemon } from '$lib/pokemon-loader';

    let nothingActive = true;
    $: nothingActive = !$pokemonList.some((pokemon) => pokemon.active);

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
                    <DexEntry pokemon={attribute} />
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
        grid-template-columns: repeat(5, 0.5fr);
        gap: 2vh 1vw;
}
#lolol{
    position: absolute;
    top:20vh;
    left:40vw;
}
</style>
