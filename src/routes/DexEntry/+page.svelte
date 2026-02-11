<script lang="ts">
    import 'firebase/firestore';
    import { loggedIn, showComponent, currentHuntScreen, currentGen } from '../store';
    import { db } from '$lib/firebase';
    import Modal from '../PokeDetails/+page.svelte';
    import type { CombinedPokemonData } from "$lib/dex-mons";
    import { get } from 'svelte/store'; // Added for store.update
    import { updatePokemonHuntStatus } from '$lib/huntStoreUtils'; // Import the centralized function

    let showModal = false;

    // DexEntry now receives a single CombinedPokemonData object as a prop
    export let pokemon: CombinedPokemonData;

    function newHuntClicked(selectedPokemon: CombinedPokemonData){
        console.log($showComponent)
        // Update Firestore: set active to true, completedStatus to false, counter to 0
        updatePokemonHuntStatus(selectedPokemon.dexNr, { active: true, completedStatus: false, counter: 0 });

        // Update the currentHuntScreen store with the new CombinedPokemonData object
        $currentHuntScreen = { ...selectedPokemon, active: true, completedStatus: false, counter: 0 };
        showComponent.set(true);
        console.log($showComponent);
    }

    function continueHuntClicked(selectedPokemon: CombinedPokemonData){
        $currentHuntScreen = selectedPokemon; // Set as CombinedPokemonData
        showComponent.set(true);
    }

</script>


{#if pokemon.active}
    <button class="enclosureActive" on:click={() => (showModal = true)}>
        {#if $loggedIn}
            <h2 id="pokename">{pokemon.name}</h2>
            <div id={"pokeimagecontainer" + $currentGen}>
                <img src={pokemon.imgURL} alt="" class="pokeImages">
            </div>
            <div class="counter">{pokemon.counter}</div>
        {/if}
    </button>
{:else if pokemon.completedStatus}
    <button class="enclosureCompleted" on:click={() => (showModal = true)}>
        {#if $loggedIn}
            <h2 id="pokename">{pokemon.name}</h2>
            <div id={"pokeimagecontainer" + $currentGen}>
                <img src={pokemon.shinyURL} alt="" class="pokeImages">
            </div>
            <div class="counter">Found!</div>
        {/if}
    </button>
{:else}
    <button class="enclosure" on:click={() => (showModal = true)}>
        {#if $loggedIn}
            <h2 id="pokename">{pokemon.name}</h2>
            <div id={"pokeimagecontainer" + $currentGen}>
                <img src={pokemon.imgURL} alt="" class="pokeImages">
            </div>

        {/if}
    </button>
{/if}

<Modal bind:showModal>
    <h2 slot="header" id="modalheader">
        {pokemon.name}
    </h2>

    <div id="pokeimagecontainerModule">
        <img src={pokemon.imgURL} alt="" class="pokeImages">
    </div>

    <ol class="poke-info">
        Here is information on this Pokémon
    </ol>
    {#if !pokemon.active}
        <button id="startHuntButton" on:click={() => (newHuntClicked(pokemon))}>
            <span class="spankekw">Start Hunt</span>
        </button>
    {:else}
        <button id="continueHuntButton" on:click={() => (continueHuntClicked(pokemon))}>Continue Hunt</button>
    {/if}
</Modal>



<style>
   @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

    .enclosure{
        position: relative;
        background-color: whitesmoke;
        height: 25vh;
        width: 19vw;
        top:10vh;
        transition: ease-out 0.25s;
        border-radius: 1.5rem;
    }

    .enclosureActive{
        position: relative;
        background-color:lightsalmon;
        height: 25vh;
        width: 19vw;
        top:10vh;
        transition: ease-out 0.25s;
        border-radius: 1.5rem;
    }
    .enclosureCompleted{
        position: relative;
        background-color:lightgreen;
        height: 25vh;
        width: 19vw;
        top:10vh;
        transition: ease-out 0.25s;
        border-radius: 1.5rem;
    }

    .enclosureCompleted:hover{
        background-color:green;
        box-shadow: 0.5vh 0.5vw;
        scale: 101%;
    }

    .enclosureActive:hover{
        background-color:orange;
        box-shadow: 0.5vh 0.5vw;
        scale: 101%;
    }
    .enclosure:hover{
        background-color:lightslategrey;
        box-shadow: 0.5vh 0.5vw;
        scale: 101%;
    }


    #pokeimagecontainer3 img{
        position: relative;
        height:100%;
        width:100%;
        height:5.5vw;
        width:5.5vw;
        bottom:5.5vh;
        right:0vw;
    }

    #pokeimagecontainer2 img{
        position: relative;
        height:100%;
        width:100%;
        height:7vw;
        width:7vw;
        bottom:3.5vw;
        right:0vw;
    }

    #pokeimagecontainer4 img{
        position: relative;
        height:100%;
        width:100%;
        height:7.6vw;
        width:7.6vw;
        bottom:3.6vw;
        right:0vw;
    }
    #pokeimagecontainer5 img{
        position: relative;
        height:100%;
        width:100%;
        height:8.5vw;
        width:8.5vw;
        bottom:3.5vw;
        right:0vw;
    }
    #pokeimagecontainer6 img{
        position: relative;
        height:100%;
        width:100%;
        height:8vw;
        width:8vw;
        bottom:3.5vw;
        right:0vw;
    }
    #pokeimagecontainer7 img{
        position: relative;
        height:100%;
        width:100%;
        height:8vw;
        width:8vw;
        bottom:3.5vw;
        right:0vw;
    }
    #pokeimagecontainer8 img{
        position: relative;
        height:100%;
        width:100%;
        height:7.5vw;
        width:7.5vw;
        bottom:3.5vw;
        right:0vw;
    }
    #pokeimagecontainer9 img{
        position: relative;
        height:100%;
        width:100%;
        height:7.5vw;
        width:7.5vw;
        bottom:3.5vw;
        right:0vw;
    }

    #pokename{
        position:absolute;
        right:1.2vw;
        top:0.5vh;
        font-family: 'Permanent Marker', cursive;
        font-size: 170%;
    }

    #modalheader{
        font-family: 'Permanent Marker', cursive;
        font-size: 170%;
        position: absolute;
        top:0vh;
        left:1vw;
    }

    .poke-info{
        position: relative;
        top:4vh;
        left:-3vw;
    }


    #pokeimagecontainerModule{
        position: relative;
        border:1px solid black;
        height:15vw;
        width:15vw;
        top:3.5vw;
        border-radius: 10%;
        background-color: whitesmoke;
    }

    #pokeimagecontainerModule img{
        position: relative;
        height:100%;
        width:100%;
    }

    #startHuntButton {
    background-color:#89CFF0; /* Green */
    outline: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    display: inline-block;
    border-radius: 12px;
    transition: all 0.3s ease;
    font-family: 'Permanent Marker', cursive;
    font-size: 130%;
    position: relative;
    overflow: hidden;
    left:49vw;
    top:20vh;
    height:10vh;
    width:13vw;
    -webkit-text-stroke-color: black;
    -webkit-text-stroke-width: 0.9px;
    border: black;
    border-width: 0.005cm;
    border-style: solid;
}

/* Shine Effect */
#startHuntButton::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.4), transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

#startHuntButton:hover::before {
    opacity: 1;
    animation: shine 1.5s infinite;
}

#startHuntButton:hover{
        background-color:#3F51B5;
        scale: 110%;
    }



/* Animation for Shine */
@keyframes shine {
    0% {
        transform: translateX(-100%) translateY(-100%);
    }
    100% {
        transform: translateX(100%) translateY(100%);
    }
}



#continueHuntButton {
    background-color:#90EE90; /* Green */
    outline: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    display: inline-block;
    border-radius: 12px;
    transition: all 0.3s ease;
    font-family: 'Permanent Marker', cursive;
    font-size: 130%;
    text-decoration:black;
    position: relative;
    overflow: hidden;
    left:49vw;
    top:20vh;
    height:10vh;

    width:13vw;
    -webkit-text-stroke-color: black;
    -webkit-text-stroke-width: 0.7px;
    border: black;
    border-width: 0.005cm;
    border-style: solid;
}

/* Shine Effect */
#continueHuntButton::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.4), transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

#continueHuntButton:hover::before {
    opacity: 1;
    animation: shine 1.5s infinite;
}

#continueHuntButton:hover{
        background-color:#32CD32;
        box-shadow: 1vh 1vw;
        scale: 110%;

    }


    .counter{
        position: absolute;
        left:1vw;
        bottom:6vh;
        font-family: 'Permanent Marker', cursive;
        font-size: 200%;
    }

</style>