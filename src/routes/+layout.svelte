<script lang="ts" context="module">
    import Login from './login.svelte';
    import { loggedIn, showComponent, currentHuntScreen } from './store';
    import MainPage from './+page.svelte';
    import Pokeball from '$lib/pokeball.png';
    import HuntingScreen from './HuntingScreen/+page.svelte';

</script>

{#if $loggedIn==true}
    {#if $showComponent==true}
        <HuntingScreen url={$currentHuntScreen[0]} name={$currentHuntScreen[1]}></HuntingScreen>
    {:else}
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
    {/if}

    
{:else}
    <slot></slot>
    <h1 class="title">log in</h1>
    <Login></Login>
{/if}

<style>
    .title{
        position: relative;
        text-align: center;
        top: 23vh;
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

