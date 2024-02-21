<script context="module" lang="ts">

    export function closeModal(modal: any, overlay: any){
        modal.classList.remove("active");
        overlay.classList.remove("active");
    }
</script>

<script lang="ts">
    /*THIS SCRIPT TAG IS NOT EVEN EXECUTING?*/
    import 'firebase/firestore';
    import { loggedIn } from '../store';
    import Modal from '../PokeDetails/+page.svelte';

    let showModal = false;

    
    export let imageSource:string;
    export let pokemonName:string; 

</script>



<button class="enclosure" on:click={() => (showModal = true)}>
    {#if $loggedIn==true}
        <h2 id="pokename">{pokemonName}</h2>
        <img src={imageSource} alt="" class="pokeImages">
        <div class="secondEnclosure"></div>
    {/if}
</button>

<Modal bind:showModal>
	<h2 slot="header" id="modalheader">
		Pokémon
	</h2>

	<ol class="definition-list">
		Here is information on this Pokémon
	</ol> 
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

    .pokeImages{
        position: absolute;
        left:0.5vw;
        top:0vh;
        scale: 1.25;
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
        left:0.5vw;
    }

    .definition-list{
        position: absolute;
        top:8vh;
        left:-1vw;
    }
</style>