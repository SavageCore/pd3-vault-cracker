import { getLocaleFromNavigator, init, register } from 'svelte-i18n';

register('en', () => import('./locales/en.json'));
register('nl', () => import('./locales/nl.json'));

init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator(),
  ignoreTag: false,
});
