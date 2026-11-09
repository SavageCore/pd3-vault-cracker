import '@picocss/pico';

import './i18n.js';
import './styles/app.scss';

import App from './App.svelte';

const target = document.getElementById('app');
if (!target) {
  throw new Error('Missing #app element');
}

const app = new App({
  target,
});

export default app;
