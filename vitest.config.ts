import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  // Svelte 5 ships a server build as its default export condition;
  // force the browser (client) build so `mount` works under jsdom.
  resolve: {
    conditions: ['browser'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
  },
});
