<script>
    import DexEntry from '../DexEntry/+page.svelte';
</script>

<div>
    <h1>ActiveHunts</h1>
    <div class="gridContainer">
    </div>
</div>

<style>
    .gridContainer{
        display: grid;
        justify-content: center;
        align-items: center;
        grid-template-columns: repeat(5, 1fr);
        row-gap: 3vh;
    }
</style>