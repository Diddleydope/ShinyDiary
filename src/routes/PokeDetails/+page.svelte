<script>


/**
 * @type {boolean}
 */
 export let showModal; // boolean

/**
 * @type {HTMLDialogElement}
 */
let dialog; // HTMLDialogElement

$: if (dialog && showModal) dialog.showModal();

</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<slot />
		<!-- svelte-ignore a11y-autofocus -->
		<button id="closebutton" on:click={() => dialog.close()}><span id="pan">close</span></button>
	</div>
</dialog>

<style>
	dialog {
		width: 65vw;
		height: 65vh;
		border-radius: 2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	#pan{
		position: relative;
		left:-1vw;
		bottom:1vh;
	}
	#closebutton {
    background-color:#E12B06; /* Green */
	text-align: center;
    color: white;
    padding: 15px 32px;
    display: inline-block;
    border-radius: 12px;
    transition: all 0.3s ease;
    font-family: 'Permanent Marker', cursive;
    font-size: 120%;
    text-decoration:black;
    position: relative;
    overflow: hidden;
    left:42vw;
    top:-30vh;
    height:5vh;
    width:7vw;
    -webkit-text-stroke-color: black;
    -webkit-text-stroke-width: 0.9px;
    border: black;
    border-width: 0.005cm;
    border-style: solid;
}

	/* Shine Effect */
	#closebutton::before {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.4), transparent 70%);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	#closebutton:hover::before {
		opacity: 1;
		animation: shine 1.5s infinite;
	}

	#closebutton:hover{
			background-color:#D11800;
			box-shadow: 1vh 1vw;
			scale: 110%;
			
		}



/* Animation for Shine */
@keyframes shine {
    0% {
        transform: translateX(-100%) translateY(-100%);
    }
    100% {
        transform: translateX(100%) translateY(100%);
    }
}


</style>