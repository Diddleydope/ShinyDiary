
<script lang="ts" context="module">
    // This script runs once when the module is first loaded.
    // It's for logic that is shared across all instances of the component.
    // We can keep component imports here if they are used in the template below.
    import Login from './login.svelte';
    import MainPage from './+page.svelte';
    import HuntingScreen from './HuntingScreen/+page.svelte';
	import Sidebar from './NavCode/Sidebar.svelte';
    import Hamburger from './NavCode/Hamburger.svelte';
</script>

<script lang="ts">
    // This script runs for each instance of the component.
    // Lifecycle functions like onMount must be in here.
    import { onMount } from 'svelte';
    import { appWindow } from '@tauri-apps/api/window';
    import { get } from 'svelte/store';
    import { loggedIn, showComponent, currentHuntScreen, openSidebar } from './store';
    import { saveHuntToFirestore, updateLocalHuntState } from '../lib/huntStoreUtils';

    onMount(() => {
        const unlisten = appWindow.onCloseRequested(async (event) => {
            const activeHunt = get(currentHuntScreen);
            if (activeHunt) {
                console.log("App closing, performing final save for active hunt...");
                // Perform one last, guaranteed save for both remote and local state
                updateLocalHuntState(activeHunt.dexNr, { counter: activeHunt.counter });
                await saveHuntToFirestore(activeHunt.dexNr, { counter: activeHunt.counter });
            }
        });

        return () => {
            unlisten.then(f => f());
        };
    });
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
