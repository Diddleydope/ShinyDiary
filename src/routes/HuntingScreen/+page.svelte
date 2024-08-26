
<script lang="ts">
    import {showComponent, shinyCounter, currentHuntScreen, incrementAmount, incrementKeybind} from '../store'
    import { onMount } from 'svelte'
    import { register, unregister } from '@tauri-apps/api/globalShortcut';
    import { doc, updateDoc } from 'firebase/firestore';
    import { db } from '../+page.svelte';
    import { currentGen } from '../ShinyDex/+page.svelte';
    import { loggedIn,
            generation2, generation3, generation4, generation5, generation6, generation7,
            generation8, generation9 } from '../store';
    import { unregisterAll } from '@tauri-apps/api/globalShortcut';


    // First param `preferences` is the local storage key.
    // Second param is the initial value.
       
    onMount(() => {
        const setupListener = async () => {
            await register($incrementKeybind, () => {
            console.log('Shortcut triggered');
            //console.log($shinyCounter[$currentHuntScreen[2]],"thisshouldbethecounter");
            $shinyCounter[$currentHuntScreen[2]] = $shinyCounter[$currentHuntScreen[2]]+ $incrementAmount;
            });
        };
        setupListener();
    })


    async function closeHuntingScreen(){
        await unregister($incrementKeybind);
        showComponent.set(false);
    }

    async function endHunt(dexnr: number){
        await unregister($incrementKeybind);
        showComponent.set(false);
        let gencheck;
        if(dexnr<=252){
            gencheck = 2;
        }
        else if(dexnr<=387){
            gencheck = 3;
        }
        else if(dexnr<=494){
            gencheck = 4;
        }
        else if(dexnr<=650){
            gencheck = 5;
        }
        else if(dexnr<=722){
            gencheck = 6;
        }
        else if(dexnr<=810){
            gencheck = 7;
        }
        else if(dexnr<=906){
            gencheck = 8;
        }
        else{
            gencheck = 9;
        }
        for(let i = 2; i<=gencheck; i++){
            let reference = doc(db, 'Pokémon/Generation' + i + '/Pokémon/' + dexnr);
            updateDoc(reference, {active: false});
            updateDoc(reference, {counter: 0});
        }

        if($generation2.length>1 && dexnr<=252){
            $generation2[dexnr-1].active = false;
        }
        if($generation3.length>1 && dexnr<=387){
            $generation3[dexnr-1].active = false;
        }
        if($generation4.length>1 && dexnr<=494){
            $generation4[dexnr-1].active = false;
        }
        if($generation5.length>1 && dexnr<=650){
            $generation5[dexnr-1].active = false;
        }
        if($generation6.length>1 && dexnr<=722){
            $generation6[dexnr-1].active = false;
        }
        if($generation7.length>1 && dexnr<=810){
            $generation7[dexnr-1].active = false;
        }
        if($generation8.length>1 && dexnr<=906){
            $generation8[dexnr-1].active = false;
        }
        if($generation9.length>1 && dexnr<=1000){
            $generation9[dexnr-1].active = false;
        }

        $shinyCounter[dexnr] = 0;
        
    }

    async function completeHunt(dexnr:number){ //same w endHunt, then ur done
        await unregister($incrementKeybind);
        showComponent.set(false);
        let gencheck;
        if(dexnr<=252){
            gencheck = 2;
        }
        else if(dexnr<=387){
            gencheck = 3;
        }
        else if(dexnr<=494){
            gencheck = 4;
        }
        else if(dexnr<=650){
            gencheck = 5;
        }
        else if(dexnr<=722){
            gencheck = 6;
        }
        else if(dexnr<=810){
            gencheck = 7;
        }
        else if(dexnr<=906){
            gencheck = 8;
        }
        else{
            gencheck = 9;
        }
        console.log(gencheck, "check var here");
        for(let i = 2; i<=gencheck; i++){
            console.log("counter of times exec")
            let reference = doc(db, 'Pokémon/Generation' + i + '/Pokémon/' + dexnr);
            updateDoc(reference, {completedStatus: true});
            updateDoc(reference, {active: false});
            updateDoc(reference, {counter: 0});
        }

        if($generation2.length>1 && dexnr<=252){
            $generation2[dexnr-1].completedStatus = true;
            $generation2[dexnr-1].active = false;
        }
        if($generation3.length>1 && dexnr<=387){
            $generation3[dexnr-1].completedStatus = true;
            $generation3[dexnr-1].active = false;
        }
        if($generation4.length>1 && dexnr<=494){
            $generation4[dexnr-1].completedStatus = true;
            $generation4[dexnr-1].active = false;
        }
        if($generation5.length>1 && dexnr<=650){
            $generation5[dexnr-1].completedStatus = true;
            $generation5[dexnr-1].active = false;
        }
        if($generation6.length>1 && dexnr<=722){
            $generation6[dexnr-1].completedStatus = true;
            $generation6[dexnr-1].active = false;
        }
        if($generation7.length>1 && dexnr<=810){
            $generation7[dexnr-1].completedStatus = true;
            $generation7[dexnr-1].active = false;
        }
        if($generation8.length>1 && dexnr<=906){
            $generation8[dexnr-1].completedStatus = true;
            $generation8[dexnr-1].active = false;
        }
        if($generation9.length>1 && dexnr<=1000){
            $generation9[dexnr-1].completedStatus = true;
            $generation9[dexnr-1].active = false;
        }

        //$shinyCounter[dexnr] = 0;
    }
/*
    onMount(async () => {
        await unregisterAll();
	});


    function completeHunt(){

    }

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
    <button id="endhunt" on:click={() => endHunt($currentHuntScreen[2])}>End Hunt</button>
    <button id="completehunt" on:click={() => completeHunt($currentHuntScreen[2])}>Complete Hunt</button>
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

    #completehunt{
        background-color: gray;
        position: absolute;
        bottom:5vh;
        left:5vw;
        border-radius: 20%;
        border: 1px solid black;
        height:4vh;
        width:6vw;
    }
</style>