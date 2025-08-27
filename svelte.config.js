// svelte.config.js
import adapter from '@sveltejs/adapter-static';           // or '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
console.log('[svelte.config.js] node:', process.version, 'path:', process.execPath);

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // enable TS inside <script lang="ts"> in .svelte files
  preprocess: vitePreprocess({ script: true }),
  kit: {
    adapter: adapter()
  }
};

export default config;