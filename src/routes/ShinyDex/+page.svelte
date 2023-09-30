<script>
    import DexEntry from '../DexEntry/+page.svelte';
    import {attributeList} from '../DexEntry/logic';
    
    console.log(attributeList[0].imgURL);
</script>

<div>
    <h1>ShinyDex</h1>
    {#each attributeList as attribute}       
        <DexEntry imageSource={attribute.imgURL}/>
    {/each}
</div>