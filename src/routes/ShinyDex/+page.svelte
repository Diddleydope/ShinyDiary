<script>
    import DexEntry from '../DexEntry/+page.svelte';
    import {attributeList} from '../DexEntry/+page.svelte';
</script>

<div>
    <h1>ShinyDex</h1>
    <div class="gridContainer">
    {#each attributeList as attribute}
    
        <DexEntry imageSource={attribute.imgURL}/>
    {/each}
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
