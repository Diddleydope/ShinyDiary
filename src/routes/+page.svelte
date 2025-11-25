<script lang="ts" context="module">
    import { auth } from '$lib/firebase';
    import { loggedIn as loggedInStore } from './store';

    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log('user has just logged in ', user);
            loggedInStore.set(true);
        } else {
            console.log('user has logged out');
            loggedInStore.set(false);
        }
    });
</script>

<script lang="ts">
    import ActiveHunts from './ActiveHunts/+page.svelte';
    import { loadPokemon } from '$lib/pokemon-loader';
    import { currentGen, currentGenLength, loggedIn } from './store';

    let hasLoadedPokemon = false;

    $: {
        if (!$loggedIn) {
            hasLoadedPokemon = false;
        } else if (!hasLoadedPokemon) {
            hasLoadedPokemon = true;
            loadPokemon($currentGen, $currentGenLength).catch((error) => {
                console.error('Failed to load Pokémon', error);
                hasLoadedPokemon = false;
            });
        }
    }
</script>


<div class="container">
{#if $loggedIn==true}
    <ActiveHunts></ActiveHunts>
{/if}
</div>


<style>



</style>
