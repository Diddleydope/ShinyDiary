<script lang="ts">
    /*THIS SCRIPT TAG IS NOT EVEN EXECUTING?*/
    import 'firebase/firestore';
    import { updateDoc, doc } from "firebase/firestore";
    import { loggedIn, showComponent, currentHuntScreen } from '../store';
    import { db } from '../+page.svelte';
    import { currentGen } from '../ShinyDex/+page.svelte';
    import Modal from '../PokeDetails/+page.svelte';

    let showModal = false;

    
    export let imageSource:string;
    export let pokemonName:string; 
    export let pokedexNumber:number;


    function newHunt(url:string, name:string, dexNr:number){ //HERE CHANGE "ACTIVE" ATTRIBUTE.
        let reference = doc(db, 'Pokémon/Generation' + $currentGen + '/Pokémon/' + dexNr);
        updateDoc(reference, {active: true});
        console.log($showComponent)
        $currentHuntScreen = [url, name];
        showComponent.set(true);
        console.log($showComponent)
    }


</script>



<button class="enclosure" on:click={() => (showModal = true)}>
    {#if $loggedIn==true}
        <h2 id="pokename">{pokemonName}</h2>
        <div id="pokeimagecontainer">
            <img src={imageSource} alt="" class="pokeImages">
        </div>
        <div class="secondEnclosure"></div>
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

    <button id="startHuntButton" on:click={() => (newHunt(imageSource,pokemonName, pokedexNumber))}>Start Hunt</button>
</Modal>



<style>
   @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

    .enclosure{
        position: relative;
        background-color: whitesmoke;
        height: 23vh;
        width: 17vw;
        top:10vh;
        left:1.5vw;
        transition: ease-out 0.25s;
        border-radius: 1.5rem;
    }

    .enclosure:hover{
        background-color:lightslategrey;
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

    #pokeimagecontainer{
        position: relative;
        border-bottom:1px solid black;
        height:7.5vw;
        width:7.5vw;
        bottom:3.5vw;
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

    #startHuntButton{
        position: absolute;
        width:10vw;
        height:5vw;
        bottom:2vh;
        right:2vw;
        border-radius: 8%;
        background-color: lightgreen;
        transition: ease-in-out 0.1s;
    }

    #startHuntButton:hover{
        background-color:seagreen;
    }

</style>