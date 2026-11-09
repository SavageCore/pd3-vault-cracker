import { getLocaleFromNavigator, init, register } from 'svelte-i18n';

register('en', () => import('./locales/en.json'));

init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator(),
  ignoreTag: false,
});
