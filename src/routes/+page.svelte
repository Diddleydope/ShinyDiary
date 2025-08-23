<script lang="ts" context="module">
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { collection, getFirestore , query, orderBy, limit, getDocs, updateDoc, deleteDoc, deleteField } from "firebase/firestore";
    import { getDownloadURL, getMetadata, getStorage, ref } from "firebase/storage";
    import {doc, setDoc} from 'firebase/firestore';
    // TODO: Add SDKs for Firebase products that you want to use
    import { loggedIn, showComponent, currentHuntScreen, generation2, generation3, generation4, generation5,
                generation6, generation7, generation8, generation9 } from './store';
    import HuntingScreen from './HuntingScreen/+page.svelte'
    import ActiveHunts from './ActiveHunts/+page.svelte';
    import ShinyDex from './ShinyDex/+page.svelte';


    //import { pokenames } from './pokemonnames.svelte';


    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
    apiKey: "AIzaSyAFO-pDyfe65OKhoUMiyqCHT9tArwGkLyQ",
    authDomain: "shinydiary-91a6f.firebaseapp.com",
    projectId: "shinydiary-91a6f",
    storageBucket: "shinydiary-91a6f.appspot.com",
    messagingSenderId: "776903912155",
    appId: "1:776903912155:web:69e404f8ed672da9c0fafe",
    measurementId: "G-M3TE3FHMF6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//make auth and firestore references
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
/*
let files ;
let pokenames = [""];


const loadItems = async () => {
    const response = await fetch('abilities.txt');
    files = await response.text();
    pokenames = files.split('\n');
    console.log(pokenames.length)
    for(let i = 0; i<1025; i++){
    let betternum = i+1
    let reference = doc(db, 'Pokémon/Generation9/Pokémon/' + betternum);
    updateDoc(reference, {name : pokenames[i]});
    }
};

loadItems();
/*
console.log(pokenames)
for(let i = 0; i<251; i++){
    let reference = doc(db, 'Pokémon/Generation2/Pokémon/' + i+1);
    updateDoc(reference, {name : pokenames[i]});
}
gen 2: 252
gen 3: 387
Gen 4: 494
Gen 5: 650
Gen 6: 722
Gen 7: 810
Gen 8: 906
Gen 9: 1000

let files;
let tempArray = new Array(2);
tempArray[0] = "";
tempArray[1] = "";
const response = await fetch('TypingsGen2.txt');
files = await response.text();
let typing = files.split('\n');

for(let i = 1; i<1000; i++){// do this for all gens first
    let counter = 0;
    while(counter<2){
        if(typing[i-1].includes("Normal")){
            tempArray[counter] = ["https://archives.bulbagarden.net/media/upload/8/8c/Normal_icon_HOME3.png"];
            counter = counter + 1;
        }
        if(typing[i-1].includes("Bug")){
            tempArray[counter] = ["https://archives.bulbagarden.net/media/upload/5/51/Bug_icon_HOME3.png"];
            counter = counter + 1;
        }
        if(typing[i-1].includes("Dark")){
            tempArray[counter] = ["https://archives.bulbagarden.net/media/upload/7/71/Dark_icon_HOME3.png"];
            counter = counter + 1;
        }
        if(typing[i-1].includes("Dragon")){
            tempArray[counter] = ["https://archives.bulbagarden.net/media/upload/c/c6/Dragon_icon_HOME3.png"];
            counter = counter + 1;
        }
        if(typing[i-1].includes("Electric")){
            tempArray[counter] = ["https://archives.bulbagarden.net/media/upload/c/cf/Electric_icon_HOME3.png"];
            counter = counter + 1;
        }
        if(typing[i-1].includes("Fairy")){
            tempArray[counter] = ["https://archives.bulbagarden.net/media/upload/0/0b/Fairy_icon_HOME3.png"];
            counter = counter + 1;
        }
        if(typing[i-1].includes("Fighting")){
            tempArray[counter] = ["https://archives.bulbagarden.net/media/upload/c/c2/Fighting_icon_HOME3.png"];
            counter = counter + 1;
        }
        if(typing[i-1].includes("Fire")){
            tempArray[counter] = ["https://archives.bulbagarden.net/media/upload/f/f9/Fire_icon_HOME3.png"];
            counter = counter + 1;
        }
        if(typing[i-1].includes("Flying")){
            tempArray[counter] = ["https://archives.bulbagarden.net/media/upload/c/c5/Flying_icon_HOME3.png"];
            counter = counter + 1;
        }
        if(typing[i-1].includes("Ghost")){
            tempArray[counter] = ["https://archives.bulbagarden.net/media/upload/2/23/Ghost_icon_HOME3.png"];
            counter = counter + 1;
        }
        if(typing[i-1].includes("Grass")){
            console.log("got grass");
            console.log("hope");
            tempArray[counter] = ["https://archives.bulbagarden.net/media/upload/8/81/Grass_icon_HOME3.png"];
            counter = counter + 1;
        }
        if(typing[i-1].includes("Ground")){
            tempArray[counter] = ["https://archives.bulbagarden.net/media/upload/e/ee/Ground_icon_HOME3.png"];
            counter = counter + 1;
        }
        if(typing[i-1].includes("Ice")){
            tempArray[counter] = ["https://archives.bulbagarden.net/media/upload/8/86/Ice_icon_HOME3.png"];
            counter = counter + 1;
        }
        if(typing[i-1].includes("Poison")){
            console.log("got inside");
            tempArray[counter] = ["https://archives.bulbagarden.net/media/upload/9/98/Poison_icon_HOME3.png"];
            counter = counter + 1;
        }
        if(typing[i-1].includes("Psychic")){
            tempArray[counter] = ["https://archives.bulbagarden.net/media/upload/2/2d/Psychic_icon_HOME3.png"];
            counter = counter + 1;
        }
        if(typing[i-1].includes("Rock")){
            tempArray[counter] = ["https://archives.bulbagarden.net/media/upload/5/51/Rock_icon_HOME3.png"];
            counter = counter + 1;
        }
        if(typing[i-1].includes("Steel")){
            tempArray[counter] = ["https://archives.bulbagarden.net/media/upload/7/78/Steel_icon_HOME3.png"];
            counter = counter + 1;
        }
        if(typing[i-1].includes("Water")){
            tempArray[counter] = ["https://archives.bulbagarden.net/media/upload/e/e7/Water_icon_HOME3.png"];
            counter = counter + 1;
        }
        console.log("AHHHH");
        counter = 2;
    }
    let reference = doc(db, 'Pokémon/Generation9/Pokémon/' + i);
    updateDoc(reference, {typing1: tempArray[0]});
    updateDoc(reference, {typing2: tempArray[1]});
    tempArray = ["", ""];

}

*/





auth.onAuthStateChanged(user => {
    if(user){
        console.log("user has just logged in " , user);
        loggedIn.set(true);
    }else{
         console.log("user has logged out");
        loggedIn.set(false);
    }
});



//
</script>


<div class="container">
{#if $loggedIn==true}
    <ActiveHunts></ActiveHunts>
{/if}
</div>


<style>



</style>
