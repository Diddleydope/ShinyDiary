<script>
    import Login from './login.svelte';
    import { loggedIn } from './store';
    import MainPage from './+page.svelte';
    import Pokeball from '$lib/pokeball.png';

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

