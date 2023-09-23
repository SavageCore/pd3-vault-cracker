import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

register('en', () => import('./locales/en.json'));
register('en-US', () => import('./locales/en-US.json'));

init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator(),
  ignoreTag: false
});