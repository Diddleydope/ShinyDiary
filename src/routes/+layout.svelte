
<script lang="ts" context="module">
    import Login from './login.svelte';
    import { loggedIn, showComponent, currentHuntScreen, openSidebar } from './store';
    import MainPage from './+page.svelte';
    import Pokeball from '$lib/pokeball.png';
    import HuntingScreen from './HuntingScreen/+page.svelte';
	import Sidebar from './NavCode/Sidebar.svelte';
    import Hamburger from './NavCode/Hamburger.svelte';
</script>


<svelte:head>
             <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"/>
</svelte:head>
{#if $loggedIn==true}
    {#if $showComponent==true}
        <HuntingScreen></HuntingScreen>
    {:else}
        <slot></slot>
        <header class="navHeader">
            <Hamburger></Hamburger>
            {#if $openSidebar==true}
            <Sidebar/>
            {/if}
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
        z-index: 1500;
        overscroll-behavior: none;
    }


    :global(body) {
        margin: 0;
		padding: 0;
	}

    .genbuttons{
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
    
</style>
