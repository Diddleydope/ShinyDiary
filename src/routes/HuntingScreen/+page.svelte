<script lang="ts">
    import {showComponent, currentHuntScreen, incrementAmount, incrementKeybind} from '../store';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { register, unregister, unregisterAll } from '@tauri-apps/api/globalShortcut';
    import { saveHuntToFirestore, updateLocalHuntState, throttledSave } from '$lib/huntStoreUtils'; // Import the centralized function

    onMount(() => {
        const setupListener = async () => {
            await unregisterAll(); 

            await register($incrementKeybind, async () => {
                if (!$currentHuntScreen || $currentHuntScreen.dexNr === undefined) {
                    console.warn("No active hunt in currentHuntScreen.");
                    return;
                }

                const dexNr = $currentHuntScreen.dexNr;
                const currentCounter = $currentHuntScreen.counter || 0;
                const newCounter = currentCounter + $incrementAmount;

                await updateLocalHuntState(dexNr, { counter: newCounter });
                throttledSave(dexNr, { counter: newCounter });

                currentHuntScreen.update(huntData => {
                    if (huntData) {
                        huntData.counter = newCounter;
                    }
                    return huntData;
                });
            });
        };
        setupListener();
    })

    async function closeHuntingScreen(){
        const huntData = $currentHuntScreen;
        await unregister($incrementKeybind);
        showComponent.set(false);
        currentHuntScreen.set(null); 
        if (huntData) {
            await updateLocalHuntState(huntData.dexNr, { active: true, counter: (huntData.counter || 0) });
            await saveHuntToFirestore(huntData.dexNr, { active: true, counter: (huntData.counter || 0) });
        }
    }

    async function endHunt(dexNr: number){
        await unregister($incrementKeybind);
        showComponent.set(false);
        currentHuntScreen.set(null); 
        await saveHuntToFirestore(dexNr, { active: false, counter: 0 });
        await updateLocalHuntState(dexNr, { active: false, counter: 0 });
    }

    async function completeHunt(dexNr:number){
        await unregister($incrementKeybind);
        showComponent.set(false);
        currentHuntScreen.set(null); 
        await saveHuntToFirestore(dexNr, { completedStatus: true, active: false, counter: 0 });
        await updateLocalHuntState(dexNr, { completedStatus: true, active: false, counter: 0 });
    }

    let displayedCounter = 0;
    $: if ($currentHuntScreen && $currentHuntScreen.counter !== undefined) {
        displayedCounter = $currentHuntScreen.counter;
    } else if ($currentHuntScreen === null) {
        displayedCounter = 0;
    }
</script>

<div class="huntOverlay">
    <div class="huntContent">
        <div class="imgcontainer">
            {#if $currentHuntScreen}
                <img src={$currentHuntScreen.imgURL} alt="" id="activeHuntImg">
            {/if}
        </div>
        <div class="pokename">{$currentHuntScreen ? $currentHuntScreen.name : ''}</div>
        <div class="pokename" id="count">{displayedCounter}</div>
    </div>
    {#if $currentHuntScreen}
        <button id="closebtn" on:click={closeHuntingScreen}><span id="pan">Close</span></button>
        <button id="endhunt" on:click={() => endHunt($currentHuntScreen.dexNr)}><span id="pan2">End Hunt</span></button>
        <button id="completehunt" on:click={() => completeHunt($currentHuntScreen.dexNr)}><span id="pan3">Complete Hunt</span></button>
    {/if}
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

    .huntOverlay {
        position: fixed;
        inset: 0;
        margin: 0;
        background-color: gainsboro;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .huntContent {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
        transform: translateY(-5vh);
    }

    .imgcontainer {
        padding: 10px;
        height: 300px;
        width: 300px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .imgcontainer #activeHuntImg {
        height: 100%;
        width: 100%;
        background: gray;
        border: 5px solid;
        border-radius: 100%;
        object-fit: cover;
    }

    .huntOverlay .pokename {
        text-align: center;
        font-family: 'Permanent Marker', cursive;
        font-size: 200%;
    }

    #count {
        font-size: 260%;
    }

    #closebtn {
        background-color: #E12B06;
        text-align: center;
        color: white;
        padding: 15px 32px;
        display: inline-block;
        border-radius: 12px;
        transition: all 0.3s ease;
        font-family: 'Permanent Marker', cursive;
        font-size: 120%;
        position: absolute;
        overflow: hidden;
        right: 2vw;
        top: 5vh;
        height: 5vh;
        width: 7vw;
        -webkit-text-stroke-color: black;
        -webkit-text-stroke-width: 0.9px;
        border: black solid 0.005cm;
    }

    #pan {
        position: relative;
        left: -1vw;
        bottom: 1vh;
    }

    #closebtn::before, #endhunt::before, #completehunt::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.4), transparent 70%);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    #closebtn:hover::before, #endhunt:hover::before, #completehunt:hover::before {
        opacity: 1;
        animation: shine 1.5s infinite;
    }

    #closebtn:hover { background-color: #D11800; scale: 110%; }

    @keyframes shine {
        0% { transform: translateX(-100%) translateY(-100%); }
        100% { transform: translateX(100%) translateY(100%); }
    }

    #endhunt {
        background-color: #6c757d;
        text-align: center;
        color: white;
        padding: 15px 32px;
        display: inline-block;
        border-radius: 12px;
        transition: all 0.3s ease;
        font-family: 'Permanent Marker', cursive;
        font-size: 140%;
        position: absolute;
        overflow: hidden;
        left: 2vw;
        top: 5vh;
        height: 8vh;
        width: 9vw;
        -webkit-text-stroke-color: black;
        -webkit-text-stroke-width: 0.9px;
        border: black solid 0.005cm;
    }

    #endhunt:hover { background-color: #343a40; scale: 110%; }

    #pan2 { position: relative; bottom: 1.5vh; }

    #completehunt {
        background-color: #ffd61e;
        text-align: center;
        color: white;
        padding: 15px 32px;
        display: inline-block;
        border-radius: 12px;
        transition: all 0.3s ease;
        font-family: 'Permanent Marker', cursive;
        font-size: 140%;
        position: absolute;
        overflow: hidden;
        height: 9vh;
        width: 18vw;
        bottom: 4vh;
        left: 41vw;
        -webkit-text-stroke-color: black;
        -webkit-text-stroke-width: 0.9px;
        border: black solid 0.005cm;
    }

    #completehunt:hover { background-color: #fff835; scale: 110%; }
</style>