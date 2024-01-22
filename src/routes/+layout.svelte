<script lang="ts" context="module">
    import Login from './login.svelte';
    import { loggedIn } from './store';
    import MainPage from './+page.svelte';
    import Pokeball from '$lib/pokeball.png';
    import { gen } from './store';


    function changeGen(genNr: number){
        gen.set(genNr);
    }


</script>

{#if $loggedIn==true}
    <slot></slot>
    <header class="navHeader">
        <nav class="navBar">
            <img src={Pokeball} alt="" id="pokeball">
            <ul class="navLinks">
                <a href="../ActiveHunts">
                    <button class="navButtons">ActiveHunts</button>
                </a>

                <a href="../LatestShinies">
                    <button class="navButtons">Latest Shinies</button>
                </a>

                <a href="../ShinyDex">
                    <button class="navButtons">Shiny Dex</button>
                </a>

                <a href="../Settings">
                    <button class="navButtons">Settings</button>
                </a>

                <a href="../Social">
                    <button class="navButtons">Social</button>
                </a>
                <div class="dropdown">

                <div class="dropdown">
                    <button class="dropbtn">Dropdown</button>
                    <div class="dropdown-content">
                        <button on:click={() => changeGen(2)}>Generation 2</button>
                        <button on:click={() => changeGen(3)}>Generation 3</button>
                        <button on:click={() => changeGen(4)}>Generation 4</button>
                        <button on:click={() => changeGen(5)}>Generation 5</button>
                        <button on:click={() => changeGen(6)}>Generation 6</button>
                        <button on:click={() => changeGen(7)}>Generation 7</button>
                        <button on:click={() => changeGen(8)}>Generation 8</button>
                        <button on:click={() => changeGen(9)}>Generation 9</button>
                    </div>
                  </div> 
                </div> 
                
            </ul>
        </nav>
        <Login></Login>
    </header>
    
{:else}
    <slot></slot>
    <h1 class="title">log in</h1>
    <Login></Login>
{/if}

<style>
    @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
     /* Dropdown Button */
    .dropbtn {
    background-color: #04AA6D;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    }

    /* The container <div> - needed to position the dropdown content */
    .dropdown {
    position: absolute;
    right:40vw;
    display: inline-block;
    }

    /* Dropdown Content (Hidden by Default) */
    .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    }

    /* Links inside the dropdown */
    .dropdown-content button {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    }

    /* Change color of dropdown links on hover */
    .dropdown-content button:hover {background-color: #ddd;}

    /* Show the dropdown menu on hover */
    .dropdown:hover .dropdown-content {display: block;}

    /* Change the background color of the dropdown button when the dropdown content is shown */
    .dropdown:hover .dropbtn {background-color: #3e8e41;} 
        .title{
        margin-top: 30vh;
        text-align: center;
        }   

    .navHeader{
        display: grid;
        position: fixed;
        background-color:ghostwhite;
        top:0;
        width:100vw;
        height: 5vw;
        left:0;
        overscroll-behavior: none;
    }

    .navButtons{
        position: relative;
        width: 9vw;
        margin-right: 2vw;
        left:23vw;
        height: 4vh;
        top:1.5vh;
        background-color: transparent;
        font-family: 'Lobster', cursive;
        font-size: large;
        border: 2px;
        border-style: solid;
        border-color: ghostwhite;
    }

    .navButtons:hover{
        border-bottom-color: black;
    }

    #pokeball{
        position: absolute;
        scale: 0.03;
        top:-110vh;
        left: -70vw;
    }
    
</style>

