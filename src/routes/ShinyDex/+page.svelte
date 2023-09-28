<script>
    import DexEntry from '../DexEntry/+page.svelte';
    import {attributeList} from '../DexEntry/+page.svelte';
</script>

<div>
    <h1>ShinyDex</h1>
    {#each attributeList as attribute}       
        <DexEntry imageSource={attribute.imgURL}/>
    {/each}
</div>