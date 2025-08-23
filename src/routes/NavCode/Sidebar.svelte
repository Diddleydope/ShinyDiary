<script>
    import Login from "../login.svelte";
</script>

<div id="links">
	
		<a class="block" href="../ActiveHunts">
            <button class="navButtons">ActiveHunts</button>
        </a>

        <a class="block" href="../Collection">
            <button class="navButtons">Collection</button>
        </a>

        <a class="block" href="../ShinyDex">
            <button class="navButtons">Shiny Dex</button>
        </a>

        <a class="block" href="../Settings">
            <button class="navButtons">Settings</button>
        </a>

        <a class="block" href="../Social">
            <button class="navButtons">Social</button>
        </a>
        <Login></Login>
</div>

<style>
    
	div {
        position:relative;
        top:10vh;
		left: 0%;
		transition: left 0.3s ease-in-out
	}
	

</style>