<script lang="ts">
    import DexEntry from '../DexEntry/+page.svelte';
    import {attributeList} from '../DexEntry/+page.svelte';
    import { loggedIn } from '../store';
/*
    console.log(attributeList[0].imgURL);
    console.log(attributeList[1].imgURL);
    console.log(attributeList[2].imgURL);
    console.log(attributeList[3].imgURL);
    console.log(attributeList[4].imgURL);
    console.log(attributeList[5].imgURL);
*/
    
</script>

<div>
    {#if $loggedIn==true}
        <div class="gridContainer">
        {#each attributeList as attribute}
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
