<script lang="ts">
    export let url:string;
    export let name:string;

    let count = 0;
</script>

<div class="container">
    <div class="imgcontainer">
        <img src={url} alt="" id="activeHuntImg">
    </div>
    <div id="pokename">{name}</div>
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

    .container #pokename{
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


</style>