
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
        if(dexnr>906){
            gencheck = 9;
        }
        else if(dexnr>810){
            gencheck = 8;
        }
        else if(dexnr>722){
            gencheck = 7;
        }
        else if(dexnr>650){
            gencheck = 6;
        }
        else if(dexnr>494){
            gencheck = 5;
        }
        else if(dexnr>387){
            gencheck = 4;
        }
        else if(dexnr>252){
            gencheck = 3;
        }
        else{
            gencheck = 2;
        }
        for(let i = 9; i>=gencheck; i--){
            let reference = doc(db, 'Pokémon/Generation' + i + '/Pokémon/' + dexnr);
            updateDoc(reference, {active: false});
            updateDoc(reference, {counter: 0});
            console.log(dexnr);
            console.log(gencheck);
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
        if(dexnr>906){
            gencheck = 9;
        }
        else if(dexnr>810){
            gencheck = 8;
        }
        else if(dexnr>722){
            gencheck = 7;
        }
        else if(dexnr>650){
            gencheck = 6;
        }
        else if(dexnr>494){
            gencheck = 5;
        }
        else if(dexnr>387){
            gencheck = 4;
        }
        else if(dexnr>252){
            gencheck = 3;
        }
        else{
            gencheck = 2;
        }
        console.log(gencheck, "check var here");
        for(let i = 9; i<=gencheck; i--){
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

*/
</script>

<div class="container">
    <div class="imgcontainer">
        <img src={$currentHuntScreen[0]} alt="" id="activeHuntImg">
    </div>
    <div class="pokename">{$currentHuntScreen[1]}</div>
    <div class="pokename" id="count">{$shinyCounter[$currentHuntScreen[2]]}</div>
    <button id="closebtn" on:click={closeHuntingScreen}><span id="pan">Close</span></button>
    <button id="endhunt" on:click={() => endHunt($currentHuntScreen[2])}><span id="pan2">End Hunt</span></button>
    <button id="completehunt" on:click={() => completeHunt($currentHuntScreen[2])}><span id="pan3">Complete Hunt</span></button>
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

	#closebtn {
    background-color:#E12B06; /* Green */
	text-align: center;
    color: white;
    padding: 15px 32px;
    display: inline-block;
    border-radius: 12px;
    transition: all 0.3s ease;
    font-family: 'Permanent Marker', cursive;
    font-size: 120%;
    text-decoration:black;
    position: absolute;
    overflow: hidden;
    right: 2vw;
    top:5vh;
    height:5vh;
    width:7vw;
    -webkit-text-stroke-color: black;
    -webkit-text-stroke-width: 0.9px;
    border: black;
    border-width: 0.005cm;
    border-style: solid;
}

    #pan{
        position: relative;
		left:-1vw;
		bottom:1vh;

    }

	/* Shine Effect */
	#closebtn::before {
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

	#closebtn:hover::before {
		opacity: 1;
		animation: shine 1.5s infinite;
	}

	#closebtn:hover{
			background-color:#D11800;
			scale: 110%;
			
		}



/* Animation for Shine */
@keyframes shine {
    0% {
        transform: translateX(-100%) translateY(-100%);
    }
    100% {
        transform: translateX(100%) translateY(100%);
    }
}

#endhunt {
    background-color:#6c757d; /* Green */
	text-align: center;
    color: white;
    padding: 15px 32px;
    display: inline-block;
    border-radius: 12px;
    transition: all 0.3s ease;
    font-family: 'Permanent Marker', cursive;
    font-size: 140%;
    text-decoration:black;
    position: absolute;
    overflow: hidden;
    left: 2vw;
    top:5vh;
    height:8vh;
    width:9vw;
    -webkit-text-stroke-color: black;
    -webkit-text-stroke-width: 0.9px;
    border: black;
    border-width: 0.005cm;
    border-style: solid;
}

	/* Shine Effect */
	#endhunt::before {
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

	#endhunt:hover::before {
		opacity: 1;
		animation: shine 1.5s infinite;
	}

	#endhunt:hover{
			background-color:#343a40;
			scale: 110%;
			
		}
    
    #pan2{
        position: relative;
        bottom:1.5vh;
    }


    #completehunt {
    background-color:#ffd61e; /* Green */
	text-align: center;
    color: white;
    padding: 15px 32px;
    display: inline-block;
    border-radius: 12px;
    transition: all 0.3s ease;
    font-family: 'Permanent Marker', cursive;
    font-size: 140%;
    text-decoration:black;
    position: absolute;
    overflow: hidden;
    height:9vh;
    width:18vw;
    bottom:4vh;
    left:41vw;
    -webkit-text-stroke-color: black;
    -webkit-text-stroke-width: 0.9px;
    border: black;
    border-width: 0.005cm;
    border-style: solid;
}

	/* Shine Effect */
	#completehunt::before {
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

	#completehunt:hover::before {
		opacity: 1;
		animation: shine 1.5s infinite;
	}

	#completehunt:hover{
			background-color:#fff835;
			scale: 110%;
			
		}
    
</style>