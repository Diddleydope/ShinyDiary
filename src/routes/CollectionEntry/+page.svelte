<script lang="ts">
import 'firebase/firestore';
import { updateDoc, doc } from "firebase/firestore";
import { loggedIn } from '../store';
import Modal from '../PokeDetails/+page.svelte';
import type { CombinedPokemonData } from '$lib/dex-mons';


export let pokemon: CombinedPokemonData;


let showModal = false;
</script>


<button class="enclosureCompleted" on:click={() => (showModal = true)}>
    {#if $loggedIn==true}
        <h2 id="pokename">{pokemon.name}</h2>
        <div id="pokeimagecontainer">
            <img src={pokemon.shinyURL} alt="" class="pokeImages">
        </div>
        <div class="counter">{pokemon.counter}</div>
    {/if}
</button>
<Modal bind:showModal>
	<h2 slot="header" id="modalheader">
		{pokemon.name}
	</h2>

    <div id="pokeimagecontainerModule">
        <img src={pokemon.shinyURL} alt="" class="pokeImages">
    </div>

	<ol class="poke-info">
		Here is information on this Pokémon
	</ol> 

    <div class="congratulations">Congratulations on finding a shiny {pokemon.name}!</div>
</Modal>


<style>


    .enclosureCompleted{
        position: relative;
        background-color:lightgreen;
        height: 25vh;
        width: 19vw;
        top:10vh;
        left:1.5vw;
        transition: ease-out 0.25s;
        border-radiwus: 1.5rem;
    }

    .enclosureCompleted:hover{
        background-color:green;
        box-shadow: 0.5vh 0.5vw;
        scale: 101%;
    }
    #pokeimagecontainer img{
        position: relative;
        height:100%;
        width:100%;
    }

    #pokename{
        position:absolute;
        right:1.2vw;
        top:0.5vh;
        font-family: 'Permanent Marker', cursive;
        font-size: 170%;
    }

    #pokeimagecontainer{
        position: relative;
        border-bottom:1px solid black;
        height:7.5vw;
        width:7.5vw;
        bottom:3.5vw;
    }

    .counter{
        position: absolute;
        left:1vw;
        bottom:6vh;
        font-family: 'Permanent Marker', cursive;
        font-size: 200%;
    }

    .congratulations{
        position: absolute;
        bottom:6vh;
        right:1vw;
        font-family: 'Permanent Marker', cursive;
        font-size: 200%;
    }

    
</style>
