import '@picocss/pico';

import './i18n.js';
import './styles/app.scss';

import { mount } from 'svelte';

import App from './App.svelte';

const target = document.getElementById('app');
if (!target) {
  throw new Error('Missing #app element');
}

const app = mount(App, {
  target,
});

export default app;
