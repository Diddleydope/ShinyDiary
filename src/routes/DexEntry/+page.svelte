<script lang="ts">
    import {storage} from '../+page.svelte';
    import { getDownloadURL, ref , listAll} from 'firebase/storage';
    import { imageSource, attributeList, Attributes } from './logic';

    
    // Create a reference under which you want to list
    setTimeout(() => {
        const listReference = ref(storage, 'Pokémon');

        listAll(listReference)
        .then((res) => {
            res.items.forEach((listRef) => {
                let pokeRef = ref(storage, listRef.fullPath);
                getDownloadURL(pokeRef)
                .then((url: string) => {
                    const attributeObj:Attributes = new Attributes(url);
                    attributeList.push(attributeObj);
                })
            });
        })
    }, 5);

</script>

<div class="enclosure">
    <img src={imageSource} alt="" class="pokeImages">
    <div class="secondEnclosure"></div>
</div>
⁄ß
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