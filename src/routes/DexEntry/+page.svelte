<script context="module" lang="ts">
    export class Attributes {
        constructor(public imgURL:string){
            this.imgURL = imgURL;
        }
    }
    export const attributeList:Attributes[] = [];
    // Create a reference under which you want to list
    setTimeout(() => {
        const listReference = ref(storage, 'Pokémon');

        listAll(listReference).then((res) => {
            res.items.forEach((listRef) => {
                let pokeRef = ref(storage, listRef.fullPath);
                getDownloadURL(pokeRef).then((url) => {
                    const attributeObj = new Attributes(url);
                    attributeList.push(attributeObj);
                })
            });
        })
    }, 10);
</script>



<script lang="ts">
    import { getDownloadURL, ref , listAll} from 'firebase/storage';
    import {storage} from '../+page.svelte';
    
    export let imageSource:string;
</script>



<div class="enclosure gridContainer">
    <img src={imageSource} alt="" class="pokeImages">
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
        left:-3vw;
        top:-5vh;
        scale: 0.4;
    }
</style>