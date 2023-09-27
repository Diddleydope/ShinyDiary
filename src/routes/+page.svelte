<script lang="ts" context="module">
    // Import the functions you need from the SDKs you need
    import {onMount} from 'svelte';
    import { initializeApp } from "firebase/app";
    import { getAuth, initializeAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";
    import { getStorage } from "firebase/storage";
    // TODO: Add SDKs for Firebase products that you want to use
    import { loggedIn } from './store';
    import Login from './login.svelte';
    import ActiveHunts from './ActiveHunts/+page.svelte';


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


auth.onAuthStateChanged(user => {
    if(user){
        console.log("user has just logged in " , user);
        loggedIn.set(true);
    }else{
         console.log("user has logged out");
        loggedIn.set(false);
    }
});

</script>

<div class="container">
{#if $loggedIn==true}
    <ActiveHunts></ActiveHunts>
{:else}
    <h1 class="title">log in</h1>
    <Login></Login>
{/if}
</div>


<style>
    .title{
    margin-top: 30vh;
    text-align: center;
    }   


</style>
