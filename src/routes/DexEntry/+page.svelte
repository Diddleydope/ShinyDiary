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
    export let completedStatus:boolean;



    function newHunt(url:string, name:string, dexNr:number){ //HERE CHANGE "ACTIVE" ATTRIBUTE.
        console.log($showComponent)
        $shinyCounter[dexNr] = 0;
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
    /*
    gen 2: 252
    gen 3: 387
    Gen 4: 494
    Gen 5: 650
    Gen 6: 722
    Gen 7: 810
    Gen 8: 906
    Gen 9: 1000
*/
    export function updateArrays(val:boolean, dexnr:number){//problem is trying to access gens where pokemon dont exist
        console.log(val, "hihi")
        if($generation2.length>1&&dexnr<=252){
            $generation2[dexnr-1].active = val;
        }
        if($generation3.length>1 && dexnr<=387){
            $generation3[dexnr-1].active = val;
        }
        if($generation4.length>1 && dexnr<=494){
            $generation4[dexnr-1].active = val;
        }
        if($generation5.length>1 && dexnr<=650){
            $generation5[dexnr-1].active = val;
        }
        if($generation6.length>1 && dexnr<=722){
            $generation6[dexnr-1].active = val;
        }
        if($generation7.length>1 && dexnr<=810){
            $generation7[dexnr-1].active = val;
        }
        if($generation8.length>1 && dexnr<=906){
            $generation8[dexnr-1].active = val;
        }
        $generation9[dexnr-1].active = val;

    }

    export function updateDb(val:boolean, dexnr:number){//problem is trying to access gens where pokemon dont exist
        if(dexnr<252){
            let reference = doc(db, 'Pokémon/Generation' + 2 + '/Pokémon/' + dexnr);
            updateDoc(reference, {active: val});
        }
        if(dexnr<=387){
            let reference = doc(db, 'Pokémon/Generation' + 3 + '/Pokémon/' + dexnr);
        updateDoc(reference, {active: val});
        }
        if(dexnr<=494){
            let reference = doc(db, 'Pokémon/Generation' + 4 + '/Pokémon/' + dexnr);
        updateDoc(reference, {active: val});
        }
        if(dexnr<=650){
            let reference = doc(db, 'Pokémon/Generation' + 5 + '/Pokémon/' + dexnr);
        updateDoc(reference, {active: val});
        }
        if(dexnr<=722){
            let reference = doc(db, 'Pokémon/Generation' + 6 + '/Pokémon/' + dexnr);
        updateDoc(reference, {active: val});
        }
        if(dexnr<=810){
            let reference = doc(db, 'Pokémon/Generation' + 7 + '/Pokémon/' + dexnr);
        updateDoc(reference, {active: val});
        }
        if(dexnr<=906){
            let reference = doc(db, 'Pokémon/Generation' + 8 + '/Pokémon/' + dexnr);
        updateDoc(reference, {active: val});
        }
   
        let reference = doc(db, 'Pokémon/Generation' + 9 + '/Pokémon/' + dexnr);
        updateDoc(reference, {active: val});
        
        
}

</script>


{#if pokemonStatus==true}
    <button class="enclosureActive" on:click={() => (showModal = true)}>
        {#if $loggedIn==true}
            <h2 id="pokename">{pokemonName}</h2>
            <div id={"pokeimagecontainer" + $currentGen}>
                <img src={imageSource} alt="" class="pokeImages">
            </div>
            <div class="counter">{$shinyCounter[pokedexNumber]}</div>
        {/if}
    </button>
{:else if completedStatus==true}
    <button class="enclosureCompleted" on:click={() => (showModal = true)}>
        {#if $loggedIn==true}
            <h2 id="pokename">{pokemonName}</h2>
            <div id={"pokeimagecontainer" + $currentGen}>
                <img src={imageSource} alt="" class="pokeImages">
            </div>
            <div class="counter">Found!</div>
        {/if}
    </button>
{:else}
    <button class="enclosure" on:click={() => (showModal = true)}>
        {#if $loggedIn==true}
            <h2 id="pokename">{pokemonName}</h2>
            <div id={"pokeimagecontainer" + $currentGen}>
                <img src={imageSource} alt="" class="pokeImages">
            </div>
            
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
        <button id="startHuntButton" on:click={() => (newHunt(imageSource,pokemonName, pokedexNumber))}>
            <span class="spankekw">Start Hunt</span>
        </button>
    {:else}
        <button id="continueHuntButton" on:click={() => (continueHunt(imageSource,pokemonName, pokedexNumber))}>Continue Hunt</button>
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
        left:1.5vw;
        transition: ease-out 0.25s;
        border-radius: 1.5rem;
    }

    .enclosureActive{
        position: relative;
        background-color:lightsalmon;
        height: 25vh;
        width: 19vw;
        top:10vh;
        left:1.5vw;
        transition: ease-out 0.25s;
        border-radius: 1.5rem;
    }
    .enclosureCompleted{
        position: relative;
        background-color:lightgreen;
        height: 25vh;
        width: 19vw;
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


    #pokeimagecontainer3 img{
        position: relative;
        height:100%;
        width:100%;
        height:5.5vw;
        width:5.5vw;
        bottom:5.5vh;
        right:5vw;
    }

    #pokeimagecontainer2 img{
        position: relative;
        height:100%;
        width:100%;
        height:7vw;
        width:7vw;
        bottom:3.5vw;
        right:4.5vw;
    }

    #pokeimagecontainer4 img{
        position: relative;
        height:100%;
        width:100%;
        height:7.6vw;
        width:7.6vw;
        bottom:3.6vw;
        right:4.7vw;
    }
    #pokeimagecontainer5 img{
        position: relative;
        height:100%;
        width:100%;
        height:8.5vw;
        width:8.5vw;
        bottom:3.5vw;
        right:4.5vw;
    }
    #pokeimagecontainer6 img{
        position: relative;
        height:100%;
        width:100%;
        height:8vw;
        width:8vw;
        bottom:3.5vw;
        right:4.5vw;
    }
    #pokeimagecontainer7 img{
        position: relative;
        height:100%;
        width:100%;
        height:8vw;
        width:8vw;
        bottom:3.5vw;
        right:4.5vw;
    }
    #pokeimagecontainer8 img{
        position: relative;
        height:100%;
        width:100%;
        height:7.5vw;
        width:7.5vw;
        bottom:3.5vw;
        right:4.5vw;
    }
    #pokeimagecontainer9 img{
        position: relative;
        height:100%;
        width:100%;
        height:7.5vw;
        width:7.5vw;
        bottom:3.5vw;
        right:4.5vw;
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