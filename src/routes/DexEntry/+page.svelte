<script context="module">
    import {storage} from '../+page.svelte';
    import { getDownloadURL, ref , listAll} from 'firebase/storage';

   
    /**
     * @type {any}
     */
    export let imageSource;

     /**
     * @param {any} imgURL
     */
     function Attributes(imgURL){
        this.imgURL = imgURL;
    }


    // @ts-ignore
    export const attributeList = [];
    // Create a reference under which you want to list
    setTimeout(() => {
        const listReference = ref(storage, 'Pokémon');

        listAll(listReference)
        .then((res) => {
            res.items.forEach((listRef) => {
                let pokeRef = ref(storage, listRef.fullPath);
                getDownloadURL(pokeRef)
                .then((url) => {
                    const attributeObj = new Attributes(url);
                    attributeList.push(attributeObj);
                })
            });
        })
    }, 5);

</script>

<div class="enclosure">
    <img src={imageSource} alt="" class="pokeImages">
    <div class="secondEnclosure">{imageSource}</div>
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