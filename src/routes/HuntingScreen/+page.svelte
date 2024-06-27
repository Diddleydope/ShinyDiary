
<script lang="ts">
    import {showComponent, shinyCounter, currentHuntScreen} from '../store'
    import { onMount } from 'svelte'
    import { register, unregister } from '@tauri-apps/api/globalShortcut';
    import { doc, updateDoc } from 'firebase/firestore';
    import { db } from '../+page.svelte';
    import { currentGen } from '../ShinyDex/+page.svelte';


    // First param `preferences` is the local storage key.
    // Second param is the initial value.
       
    //HAVE AN ARRAY OF PERSISTED WITH INDEX AS DEX NR AND COUNTERS IN THERE, OR FIND ANOTHER SOLULU
    onMount(() => {
        const setupListener = async () => {
            await register('SPACE', () => {
            console.log('Shortcut triggered');
            $shinyCounter[$currentHuntScreen[2]] = $shinyCounter[$currentHuntScreen[2]]+ 1;
            });
        };
        setupListener();
    })


    async function closeHuntingScreen(){
        await unregister('SPACE');
        showComponent.set(false);
    }

    async function endHunt(dexnr: string | number){
        await unregister('SPACE');
        let reference = doc(db, 'Pokémon/Generation' + $currentGen + '/Pokémon/' + dexnr);
        updateDoc(reference, {active: false});
        showComponent.set(false);
    }
/*
    const webview = new WebviewWindow('window');

    onMount(() => {
        const webview = new WebviewWindow('window');
        const setupListener = async () => {
            await webview.listen("event-name", e => {
                console.log("goteem: ", e)
                count++;
            });
        };
        setupListener();
    });
    function closeHuntingScreen(){
        showComponent.set(false);
    }

*/
/*
    import { onMount } from 'svelte';
    import {showComponent} from '../store'
    import { register } from '@tauri-apps/api/globalShortcut';

    export let url:string;
    export let name:string;

    let count = 0;


    onMount(() => {
        const setupListener = async () => {
            await register('CommandOrControl+G', () => {
            console.log('Shortcut triggered');
            });
        };
        setupListener();
    });
    
    function closeHuntingScreen(){
        showComponent.set(false);
    }
    

*/
</script>

<div class="container">
    <div class="imgcontainer">
        <img src={$currentHuntScreen[0]} alt="" id="activeHuntImg">
    </div>
    <div class="pokename">{$currentHuntScreen[1]}</div>
    <div class="pokename" id="count">{$shinyCounter[$currentHuntScreen[2]]}</div>
    <button id="closebtn" on:click={closeHuntingScreen}>Close</button>
    <button id="endhunt" on:click={() => endHunt($currentHuntScreen[2])}>EndHunt</button>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

    .container{
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background-color: gainsboro;
    }
    .imgcontainer #activeHuntImg{
        position: relative;
        height: 100%;
        width: 100%;
        background: gray;
        border: 5px solid;
        border-radius: 100%;
        }

    .container .pokename{
        position: relative;
        text-align: center;
        font-family: 'Permanent Marker', cursive;
        font-size: 200%;
        top:17vh;
    }

    .imgcontainer{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -75%);
        padding: 10px;
        height:300px;
        width:300px;
        overflow: hidden;   
        }

    #count{
        top:60vh;
    }

    #closebtn{
        background-color: gray;
        position: absolute;
        top:5vh;
        right:5vw;
        border-radius: 20%;
        border: 1px solid black;
        height:4vh;
        width:6vw;
    }

    #endhunt{
        background-color: gray;
        position: absolute;
        top:5vh;
        left:5vw;
        border-radius: 20%;
        border: 1px solid black;
        height:4vh;
        width:6vw;
    }
</style>