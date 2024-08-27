<script lang="ts" context="module">
    import Login from './login.svelte';
    import { loggedIn, showComponent, currentHuntScreen } from './store';
    import MainPage from './+page.svelte';
    import Pokeball from '$lib/pokeball.png';
    import HuntingScreen from './HuntingScreen/+page.svelte';

</script>

{#if $loggedIn==true}
    {#if $showComponent==true}
        <HuntingScreen></HuntingScreen>
    {:else}
        <slot></slot>
        <header class="navHeader">
            <nav class="navBar">
        
                <ul class="navLinks">
                    <a href="../ActiveHunts">
                        <button class="navButtons">ActiveHunts</button>
                    </a>

                    <a href="../Collection">
                        <button class="navButtons">Collection</button>
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
        padding: 0;
        margin:0;
        width: 12vw;
        left:15.55vw;
        height: 8vh;
        top:-1.8vh;
        font-family: 'Permanent Marker', cursive;
        font-size: 130%;
        transition: ease-out 0.25s;
        background-color:transparent;
        border-color: black;
        border-style: solid;
        border-width: 0.05vw;
    }

    .navButtons:hover{
        background-color:rosybrown;
        scale:1.05;
    }

    #pokeball{
        position: absolute;
        scale: 0.03;
        top:-110vh;
        left: -70vw;
    }
    
</style>

