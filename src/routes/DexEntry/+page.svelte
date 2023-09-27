<script>
    import Pokeball from '$lib/pokeball.png';
    import {storage} from '../+page.svelte';
    import { getDownloadURL, ref } from 'firebase/storage';
    

    //NEXT --> MAKE DEX ENTRY INTO AN OBJECT AND PRINT OUT POKEDEX
    /**
     * @type {HTMLImageElement}
     */
    let imgHolder;

    // Create a reference with an initial file path and name
    const pathReference = ref(storage, 'Pokémon/Bulbasaur.png');

    getDownloadURL(pathReference)
    .then((url) => {
    // Insert url into an <img> tag to "download"
        imgHolder.setAttribute('src', url);
     })

    let entry = {
        image : Pokeball,
    }
</script>



<div class="enclosure">
    <img src="" alt="" class="pokeImages" bind:this={imgHolder}>
    <div class="secondEnclosure"></div>
</div>

<style>
    .enclosure{
        position: relative;
        background-color: whitesmoke; /*WHY MULTIPLE TIMES AND WHY BLACK ONES*/
        height: 23vh;
        width: 17vw;
        border:transparent;
        border-radius: 1.5rem;
        top:2vh;
        left:1.5vw;
    }

    .pokeImages{
        position: absolute;
        top:-108vh;
        left:-70vw;
        scale: 0.05;
    }

</style>