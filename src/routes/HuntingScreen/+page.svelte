<script lang="ts">
    import {showComponent} from '../store'
    import { listen } from '@tauri-apps/api/event'
    import { WebviewWindow } from '@tauri-apps/api/window';
    import { onMount } from 'svelte'


    export let url:string;
    export let name:string;

    function closeHuntingScreen(){
        showComponent.set(false);
    }


    listener();
    

</script>


<script context="module">
    let count = 0;

    const webview = new WebviewWindow('window');

    const listener = await webview.listen("event name", e => {
                    console.log("testing");
                    })
</script>

<div class="container">
    <div class="imgcontainer">
        <img src={url} alt="" id="activeHuntImg">
    </div>
    <div class="pokename">{name}</div>
    <div class="pokename" id="count">{count}</div>
    <button id="closebtn" on:click={closeHuntingScreen}>Close</button>
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
</style>