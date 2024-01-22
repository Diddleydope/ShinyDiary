<script context="module" lang="ts">
    export class Attributes {
        constructor(public imgURL:string, public name:string){
            this.imgURL = imgURL;
            this.name = name;
        }
    }

    export const attributeList:Attributes[] = [];
    export let currentGen = 5;

    /*.subscribe((value) => {
        currentGen = value;
    })*/
    
    // Create a reference under which you want to list
    setTimeout(async () => {
    const storageRef = collection(db, 'Pokémon/Generation' + currentGen + '/Pokémon');
    const q = query(storageRef, orderBy("dexNr", "asc"));
    const querySnapshot = await getDocs(q);

    attributeList.push(
        ...(await Promise.all(
            querySnapshot.docs.map(async (doc) => {
                const infoObj = new Attributes(doc.data().URL_Normal, doc.data().name);
                return infoObj;
            })
        ))
    );
    }, 10);
</script>



<script lang="ts">
    import { getDownloadURL, ref , listAll, list} from 'firebase/storage';
    import {storage, db} from '../+page.svelte';
    import { doc, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
    import 'firebase/firestore';
    import Layout from '../+layout.svelte';
    import { loggedIn } from '../store';
    import { gen } from '../store';
    
    export let imageSource:string;
    export let pokemonName:string;
</script>



<div class="enclosure">
    {#if $loggedIn==true}
        <h2>{pokemonName}</h2>
        <img src={imageSource} alt="" class="pokeImages">
        <div class="secondEnclosure"></div>
    {/if}
</div>

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

    h2{
        position:absolute;
        right:1.5vw;
        font-family: 'Permanent Marker', cursive;
        font-size: 130%;
    }
</style>