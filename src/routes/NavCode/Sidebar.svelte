<script>
  import Login from "../login.svelte";
</script>

<nav class="nav">
  <a class="navButton" href="../ActiveHunts">ActiveHunts</a>
  <a class="navButton" href="../Collection">Collection</a>
  <a class="navButton" href="../ShinyDex">Shiny Dex</a>
  <a class="navButton" href="../Settings">Settings</a>
  <a class="navButton" href="../Social">Social</a>
  <Login />
</nav>

<style>
  :root{
    --nav-gap: .6rem;
    --nav-pad-y: 0.55rem;
    --nav-pad-x: .9rem;
    --nav-radius: 12px;
    --nav-font-size: 0.95rem;
    --nav-font-weight: 600;
    --nav-bg: #ffb08a;
    --nav-bg-hover: #ffa178;
    --nav-fg: #1a1a1a;
    --nav-border: rgba(0,0,0,.08);
    --nav-shadow: 0 2px 10px rgba(0,0,0,.08);
    --nav-shadow-hover: 0 4px 16px rgba(0,0,0,.12);
    --nav-focus: 2px solid #7c9cff;
    --nav-backdrop: rgba(255,255,255,.6);
  }
  @media (prefers-color-scheme: dark){
    :root{
      --nav-bg: #2a2a2a;
      --nav-bg-hover: #333;
      --nav-fg: #f2f2f2;
      --nav-border: rgba(255,255,255,.06);
      --nav-backdrop: rgba(20,20,20,.35);
    }
  }

  /* Sidebar unten links verankern */
  .nav{
    z-index: 3;

    position: fixed;
    left: 1rem;
    bottom: 2rem;     /* Abstand vom unteren Rand */
    top: auto;        /* wichtig: top deaktivieren */
    transform: none;

    display: flex;
    flex-direction: column;
    gap: var(--nav-gap);

    backdrop-filter: blur(6px);
    background: var(--nav-backdrop);
    padding: .4rem .5rem;
    border-radius: 999px;
    border: 1px solid var(--nav-border);
  }

  .navButton{
    z-index: 2;

    display: inline-block;
    text-decoration: none;
    font-size: var(--nav-font-size);
    font-weight: var(--nav-font-weight);
    color: var(--nav-fg);
    background: var(--nav-bg);
    padding: var(--nav-pad-y) var(--nav-pad-x);
    border-radius: var(--nav-radius);
    border: 1px solid var(--nav-border);
    box-shadow: var(--nav-shadow);
    transition: transform .12s ease, box-shadow .12s ease, background-color .12s ease, opacity .12s ease;
    user-select: none;
    line-height: 1;
  }
  .navButton:hover{
    background: var(--nav-bg-hover);
    box-shadow: var(--nav-shadow-hover);
    transform: translateY(-1px);
  }
  .navButton:active{
    transform: translateY(0);
    opacity: .95;
    box-shadow: none;
  }
  .navButton:focus-visible{
    outline: none;
    box-shadow: var(--nav-shadow-hover);
    position: relative;
  }
  .navButton:focus-visible::after{
    content: "";
    position: absolute;
    inset: -4px;
    border: var(--nav-focus);
    border-radius: calc(var(--nav-radius) + 6px);
    pointer-events: none;
  }

  /* Mobil: mittig unten */
  @media (max-width: 640px){
    .nav{
      left: 50%;
      bottom: 1rem;
      transform: translateX(-50%);
      gap: .4rem;
      padding: .35rem .4rem;
    }
    .navButton{
      font-size: .9rem;
      padding: .5rem .75rem;
    }
  }
</style>