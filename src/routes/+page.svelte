<script lang="ts" context="module">
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    import { getAnalytics } from "firebase/analytics";
    import { getAuth, initializeAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";
    // TODO: Add SDKs for Firebase products that you want to use
    import { invoke } from '@tauri-apps/api/tauri';
    import Login from './login.svelte'

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
</script>


<h1 class="title">Welcome to ShinyDiary!</h1>
<Login></Login>


<style>
    .title{
    margin-top: 30vh;
    text-align: center;
    }   
</style>

