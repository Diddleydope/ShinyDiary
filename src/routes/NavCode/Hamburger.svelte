<script lang="ts">
	import { openSidebar } from '../store'; // writable(false)
	import { auth } from '../+page.svelte';
	import { loggedIn } from '../store';
  
	function toggle() { $openSidebar = !$openSidebar }
	function close()  { $openSidebar = false }
  
	// ESC schließt & Body-Scroll sperren, wenn offen
	function onKey(e: KeyboardEvent){ if(e.key === 'Escape') close() }
	$: {
	  if ($openSidebar) document.body.classList.add('no-scroll');
	  else document.body.classList.remove('no-scroll');
	}
  </script>
  
  <svelte:window on:keydown={onKey} />
  
  <!-- Hamburger-Trigger -->
  <button
	class="hamburger-btn text-gray-500 hover:text-gray-700 cursor-pointer mr-4 border-none focus:outline-none"
	class:openSidebar={$openSidebar}
	on:click={toggle}
	aria-label="Menü"
	aria-expanded={$openSidebar}
	aria-controls="nav-drawer"
  >
	<svg width="32" height="24">
	  <line id="top"    x1="0" y1="2"  x2="32" y2="2"/>
	  <line id="middle" x1="0" y1="12" x2="24" y2="12"/>
	  <line id="bottom" x1="0" y1="22" x2="32" y2="22"/>
	</svg>
  </button>
  
  <!-- Overlay, klick schließt -->
  <div class="backdrop" class:show={$openSidebar} on:click={close}></div>
  
  <!-- Linker Drawer -->
  <aside id="nav-drawer" class="drawer" class:open={$openSidebar} role="dialog" aria-modal="true">
	<nav class="nav">
	  <a class="navButton" href="../ActiveHunts" on:click={close}>ActiveHunts</a>
	  <a class="navButton" href="../Collection"  on:click={close}>Collection</a>
	  <a class="navButton" href="../ShinyDex"    on:click={close}>Shiny Dex</a>
	  <a class="navButton" href="../Settings"    on:click={close}>Settings</a>
	  <a class="navButton" href="../Social"      on:click={close}>Social</a>
  
	  <!-- wichtig: kein globales button-Style mehr, daher bleibt er im Flow -->
	  <button
		type="button"
		class="navButton"
		id="signOutButton"
		on:click={() => auth.signOut()}>
		Sign out
	  </button>
	</nav>
  </aside>
  
  <style>
	/* --- NUR der Hamburger-Trigger --- */
	.hamburger-btn{
	  position: fixed; /* bleibt sichtbar */
	  top: 2vh;
	  left: .5vw;
	  z-index: 1002;
	  background: transparent;
	}
	.hamburger-btn svg{
	  min-height: 24px;
	  transition: transform .3s ease-in-out;
	}
	.hamburger-btn svg line{
	  stroke: currentColor;
	  stroke-width: 3;
	  transition: transform .3s ease-in-out, opacity .2s ease-in-out;
	}
	/* Animation im offenen Zustand */
	.hamburger-btn.openSidebar svg{ transform: scale(.7) }
	.hamburger-btn.openSidebar #top{    transform: translate(6px,0) rotate(45deg) }
	.hamburger-btn.openSidebar #middle{ opacity: 0 }
	.hamburger-btn.openSidebar #bottom{ transform: translate(-12px,9px) rotate(-45deg) }
  
	/* --- Drawer + Overlay --- */
	:root{
	  --drawer-width: 300px;
	  --drawer-bg: #fff;
	  --drawer-shadow: 0 10px 30px rgba(0,0,0,.15);
	  --gap: .6rem;
	  --btn-radius: 12px;
	  --btn-pad-y: .6rem;
	  --btn-pad-x: 1rem;
	  --btn-bg: #ffb08a;
	  --btn-bg-hover: #ffa178;
	  --btn-fg: #1a1a1a;
	}
	@media (prefers-color-scheme: dark){
	  :root{
		--drawer-bg:#1f1f1f;
		--btn-fg:#f2f2f2;
		--btn-bg:#2a2a2a;
		--btn-bg-hover:#333;
	  }
	}
  
	.backdrop{
	  position: fixed; inset: 0;
	  background: rgba(0,0,0,0);
	  opacity: 0; pointer-events: none;
	  transition: opacity .2s ease;
	  z-index: 1000;
	}
	.backdrop.show{
	  background: rgba(0,0,0,.5);
	  opacity: 1; pointer-events: auto;
	}
  
	.drawer{
		z-index: 2;

	    position: fixed; top: 0; left: 0;
		height: 100dvh;
		width: min(var(--drawer-width), 90vw);
		background: var(--drawer-bg);
		box-shadow: var(--drawer-shadow);
		transform: translateX(-100%);
		transition: transform .25s ease;
		z-index: 1001;
		display: flex;
		flex-direction: column;       /* <— wichtig: vertikale Achse */
		padding: 1rem;
	}
	.drawer.open{ transform: translateX(0) }
  
	.nav{
		z-index: 2;

		display: flex;
		flex-direction: column;
		gap: var(--gap);
		width: 100%;
		margin-top: 3.5rem;             /* <— schiebt die ganze Nav nach unten */
		margin-bottom: auto;         /* optional Luft zum unteren Rand */
}
  
	.navButton{
	  display: block;        /* volle Zeile */
	  width: 100%;
	  text-decoration: none;
	  color: var(--btn-fg);
	  background: var(--btn-bg);
	  padding: var(--btn-pad-y) var(--btn-pad-x);
	  border-radius: var(--btn-radius);
	  border: 1px solid rgba(0,0,0,.08);
	  box-shadow: 0 2px 8px rgba(0,0,0,.06);
	  transition: transform .12s ease, background-color .12s ease, box-shadow .12s ease;
	}
	.navButton:hover{
	  background: var(--btn-bg-hover);
	  transform: translateY(-1px);
	}
  
	/* Body-Scroll sperren, wenn offen */
	.no-scroll{ overflow: hidden }
  
	/* Kleiner auf sehr schmalen Screens */
	@media (max-width:420px){
	  :root{ --drawer-width: 260px; }
	}

	#signOutButton{
		position:fixed;
	  bottom:2rem;
	  width: 90%;
	  text-decoration: none;
	  color: var(--btn-fg);
	  background: var(--btn-bg);
	  padding: var(--btn-pad-y) var(--btn-pad-x);
	  border-radius: var(--btn-radius);
	  border: 1px solid rgba(0,0,0,.08);
	  box-shadow: 0 2px 8px rgba(0,0,0,.06);
	  transition: transform .12s ease, background-color .12s ease, box-shadow .12s ease;
	}
  </style>