<script lang="ts">
    import {showComponent, shinyCounter, currentHuntScreen, incrementAmount,
            incrementKeybind} from '../store'

    $: buttonText = $incrementKeybind


    function onKeyDown(e:any) {
        $incrementKeybind = e.key;
        buttonText = $incrementKeybind;
    }

    function changeButtonText(){
        buttonText = "Press Any Button..."
    }


</script>

<div class="defaultStyle">
    Increment Hotkey: 
    <button class="newhotkeybox" on:keydown={onKeyDown} on:click={changeButtonText} tabindex="0">{buttonText}</button>
    <br> <br>
    Increment Amount: &ensp; {$incrementAmount}
    <button class="plusandminus"  on:click={() => $incrementAmount = $incrementAmount+1}>+</button>
    <button class="plusandminus" on:click={() => $incrementAmount = $incrementAmount-1}>-</button>
</div>


<style>
    .defaultStyle{
        position: relative;
        font-family: 'Permanent Marker', cursive;
        font-size: 125%;
        top:10vh;
        left:5vw;
    }

    .newhotkeybox{
        position: relative;
        background-color: darkgray;
        height:2.5vw;
        width: 20vw;
        left:1vw;
        border:0.1vw;
        border-style: solid;
        border-color: black;
        text-align: center;
        font-family: 'Permanent Marker', cursive;
        font-size: 85%;
        transition: ease-out 0.25s;
        }
    
    .newhotkeybox:hover{
        background-color:gray;
        box-shadow: 0.25vh 0.25vw;
        scale: 105%;
    }

    .plusandminus{
        position: relative;
        background-color: darkgray;
        height:2.5vw;
        width: 8vw;
        left:1vw;
        border:0.1vw;
        border-style: solid;
        border-color: black;
        text-align: center;
        font-family: 'Permanent Marker', cursive;
        font-size: 85%;
        transition: ease-out 0.25s;
        }
    
    .plusandminus:hover{
        background-color:gray;
        box-shadow: 0.25vh 0.25vw;
        scale: 105%;
    }
    
</style>
