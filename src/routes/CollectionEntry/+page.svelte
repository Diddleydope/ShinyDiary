<script lang="ts">
import 'firebase/firestore';
import { updateDoc, doc } from "firebase/firestore";
import { loggedIn, showComponent, currentHuntScreen, shinyCounter,
        generation2, generation3, generation4, generation5, generation6, generation7,
        generation8, generation9 } from '../store';
import { db } from '../+page.svelte';
import { currentGen, DexMons, currentGenLength } from '../ShinyDex/+page.svelte';
import Modal from '../PokeDetails/+page.svelte';


export let imageSource:string;
export let pokemonName:string; 
export let pokedexNumber:number;
export let completedCounter:number;


let showModal = false;
</script>


<button class="enclosureCompleted" on:click={() => (showModal = true)}>
    {#if $loggedIn==true}
        <h2 id="pokename">{pokemonName}</h2>
        <div id="pokeimagecontainer">
            <img src={imageSource} alt="" class="pokeImages">
        </div>
        <div class="counter">{completedCounter}</div>
    {/if}
</button>
<Modal bind:showModal>
	<h2 slot="header" id="modalheader">
		{pokemonName}
	</h2>

    <div id="pokeimagecontainerModule">
        <img src={imageSource} alt="" class="pokeImages">
    </div>

	<ol class="poke-info">
		Here is information on this Pokémon
	</ol> 

    <div class="congratulations">Congratulations on finding a shiny {pokemonName}!</div>
</Modal>


<style>


    .enclosureCompleted{
        position: relative;
        background-color:lightgreen;
        height: 23vh;
        width: 17vw;
        top:10vh;
        left:1.5vw;
        transition: ease-out 0.25s;
        border-radius: 1.5rem;
    }

    .enclosureCompleted:hover{
        background-color:green;
        box-shadow: 0.5vh 0.5vw;
        scale: 105%;
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