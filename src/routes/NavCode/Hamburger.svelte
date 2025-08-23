<script>
    import {  openSidebar } from '../store';
</script>

<button class="text-gray-500 hover:text-gray-700 cursor-pointer mr-4 border-none focus:outline-none"  class:openSidebar={$openSidebar} on:click={() => $openSidebar = !$openSidebar}>
	<svg width=32 height=24>
		<line id="top" x1=0 y1=2  x2=32 y2=2/>
		<line id="middle" x1=0 y1=12 x2=24 y2=12/>
		<line id="bottom" x1=0 y1=22 x2=32 y2=22/>
	</svg>
</button>

<style>
	svg {
		min-height: 24px;
		transition: transform 0.3s ease-in-out;
	}
	
	svg line {
		stroke: currentColor;
		stroke-width: 3;
		transition: transform 0.3s ease-in-out
	}
	
	button {
		position: absolute;
		top:2vh;
		left:0.5vw;
		z-index: 20;
	}
	
	.openSidebar svg {
		transform: scale(0.7)
	}
	
	.openSidebar #top {
		transform: translate(6px, 0px) rotate(45deg)
	}
	
	.openSidebar #middle {
		opacity: 0;
	}
	
  .openSidebar #bottom {
		transform: translate(-12px, 9px) rotate(-45deg)
	}
</style>