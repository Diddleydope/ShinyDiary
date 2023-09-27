<script>
    import Pokeball from '$lib/pokeball.png';
    import {storage} from '../+page.svelte';
    import { getDownloadURL, ref , listAll} from 'firebase/storage';
    

    //NEXT --> USE LISTALL COMMAND AND OUTPUT IMAGES ONTO SEPERATE ENTRY OBJECT
    /**
     * @type {HTMLImageElement}
     */
    let imgHolder;

    // Create a reference with an initial file path and name
    const dirReference = ref(storage, 'Pokémon');

    // Create a reference under which you want to list
const listReference = ref(storage, 'Pokémon');

listAll(listReference)
  .then((res) => {
    res.items.forEach((listRef) => {
        let pokeRef = ref(storage, listRef.fullPath);
        getDownloadURL(pokeRef)
        .then((url) => {
        // Insert url into an <img> tag to "download"
        imgHolder.setAttribute('src', url);
        })
    });
  })
    // Insert url into an <img> tag to "download"
    
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
        top:0vh;
        left:0vw;
        scale: 0.4;
    }

</style>