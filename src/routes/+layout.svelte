<script>
    import Login from './login.svelte';
    import { loggedIn } from './store';
    import MainPage from './+page.svelte';

    /**
     * @type {HTMLElement}
     */
    let headerVar;

    function setSticky(){
        headerVar.classList.add("sticky");
    }
</script>

{#if $loggedIn==true}
    <slot></slot>
    <header class="navHeader" on:scroll={setSticky} bind:this={headerVar}>
        <nav>
            <ul class="navLinks">
                <a href="../ActiveHunts">
                    <button>ActiveHunts</button>
                </a>

                <a href="../LatestShinies">
                    <button>Latest Shinies</button>
                </a>

                <a href="../ShinyDex">
                    <button>Shiny Dex</button>
                </a>

                <a href="../Settings">
                    <button>Settings</button>
                </a>

                <a href="../Social">
                    <button>Social</button>
                </a>
            </ul>
        </nav>
        <Login></Login>
    </header>
{:else}
    <slot></slot>
{/if}

<style>
    .navHeader{
        position: absolute;
        overflow: hidden;
        background-color:ghostwhite;
        top:0;
        width:100vw;
        height: 10vw;
        left:0;
    }
    /* The sticky class is added to the navbar with JS when it reaches its scroll position */
    .sticky {
    position: fixed;
    top: 0;
    width: 100%;
    }
</style>

