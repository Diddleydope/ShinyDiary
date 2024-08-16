<script lang="ts">
    import 'firebase/firestore';
    import { updateDoc, doc } from "firebase/firestore";
    import { loggedIn, showComponent, currentHuntScreen, shinyCounter,
            generation2, generation3, generation4, generation5, generation6, generation7,
            generation8, generation9 } from '../store';
    import { db } from '../+page.svelte';
    import { currentGen, DexMons, currentGenLength } from '../ShinyDex/+page.svelte';
    import Modal from '../PokeDetails/+page.svelte';

    let showModal = false;

    
    export let imageSource:string;
    export let pokemonName:string; 
    export let pokedexNumber:number;
    export let pokemonStatus:boolean;



    function newHunt(url:string, name:string, dexNr:number){ //HERE CHANGE "ACTIVE" ATTRIBUTE.
        console.log($showComponent)
        $currentHuntScreen = [url, name, dexNr];
        showComponent.set(true);
        console.log($showComponent);
        updateDb(true, dexNr);//NEED TO UPDATE IN ALL ARRAYS !!
        updateArrays(true, dexNr);
    }

    function continueHunt(url:string, name:string, dexNr:number){
        $currentHuntScreen = [url, name, dexNr];
        showComponent.set(true);
    }

    export function updateArrays(val:boolean, dexnr:number){
        if($generation2.length>1){
            $generation2[dexnr].active = (val);
        }
        if($generation3.length>1){
            $generation3[dexnr-1].active = (val);
        }
        if($generation4.length>1){
            $generation4[dexnr-1].active = (val);
        }
        if($generation5.length>1){
            $generation5[dexnr-1].active = (val);
        }
        if($generation6.length>1){
            $generation6[dexnr-1].active = (val);
        }
        if($generation7.length>1){
            $generation7[dexnr-1].active = (val);
        }
        if($generation8.length>1){
            $generation8[dexnr-1].active = (val);
        }
        if($generation9.length>1){
            $generation9[dexnr-1].active = (val);
        }
    }

    export function updateDb(val:boolean, dexnr:number){
        for(let i = 2; i<=9; i++){
            let reference = doc(db, 'Pokémon/Generation' + i + '/Pokémon/' + dexnr);
            updateDoc(reference, {active: val})
        }
}

</script>


{#if pokemonStatus==false}
    <button class="enclosure" on:click={() => (showModal = true)}>
        {#if $loggedIn==true}
            <h2 id="pokename">{pokemonName}</h2>
            <div id="pokeimagecontainer">
                <img src={imageSource} alt="" class="pokeImages">
            </div>
            <div class="secondEnclosure"></div>
        {/if}
    </button>
{:else}
    <button class="enclosureActive" on:click={() => (showModal = true)}>
        {#if $loggedIn==true}
            <h2 id="pokename">{pokemonName}</h2>
            <div id="pokeimagecontainer">
                <img src={imageSource} alt="" class="pokeImages">
            </div>
            <div class="counter">{$shinyCounter[pokedexNumber]}</div>
        {/if}
    </button>
{/if}

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
    {#if pokemonStatus==false}
        <button id="startHuntButton" on:click={() => (newHunt(imageSource,pokemonName, pokedexNumber))}>Start Hunt</button>
    {:else}
        <button id="continueHuntButton" on:click={() => (continueHunt(imageSource,pokemonName, pokedexNumber))}>Continue Hunt</button>
    {/if}
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

    .enclosureActive{
        position: relative;
        background-color:lightsalmon;
        height: 23vh;
        width: 17vw;
        top:10vh;
        left:1.5vw;
        transition: ease-out 0.25s;
        border-radius: 1.5rem;
    }
    
    .enclosureActive:hover{
        background-color:orange;
        box-shadow: 0.5vh 0.5vw;
        scale: 105%;
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
        background-color: cornflowerblue;
        transition: ease-in-out 0.1s;
    }

    #startHuntButton:hover{
        background-color:blue;
    }

    #continueHuntButton{
        position: absolute;
        width:10vw;
        height:5vw;
        bottom:2vh;
        right:2vw;
        border-radius: 8%;
        background-color: lightgreen;
        transition: ease-in-out 0.1s;
    }
    #continueHuntButton:hover{
        background-color:green;
    }

    .counter{
        position: absolute;
        left:1vw;
        bottom:6vh;
        font-family: 'Permanent Marker', cursive;
        font-size: 200%;
    }

</style>