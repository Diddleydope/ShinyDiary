<script lang="ts">
    import DexEntry from '../DexEntry/+page.svelte';
    import {attributeList} from '../store';
    import { loggedIn } from '../store';
</script>

<div>
    {#if $loggedIn==true}
        <div class="gridContainer">
        {#each $attributeList as attribute}
            <DexEntry imageSource={attribute.imgURL} pokemonName={attribute.name}/>
        {/each}
        </div>
    {/if}
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
