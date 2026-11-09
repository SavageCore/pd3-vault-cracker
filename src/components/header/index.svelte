<script lang="ts">
  import { _ } from 'svelte-i18n';
  import GitubIcon from '../../assets/icons/github.svelte';
  import HelpIcon from '../../assets/icons/help.svelte';
  import MoonIcon from '../../assets/icons/moon.svelte';
  import SunIcon from '../../assets/icons/sun.svelte';
  import Modal from '../modals/help/index.svelte';

  let isModalOpen = false;
  const themeStorageKey = 'theme-preference';

  const getColorPreference = () => {
    const storedPreference = localStorage.getItem(themeStorageKey);
    if (storedPreference) {
      return storedPreference;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  const theme = {
    value: getColorPreference(),
  };

  const toggleHelpModal = () => {
    isModalOpen = !isModalOpen;
  };

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';

    setThemePreference();
  };

  const setThemePreference = () => {
    localStorage.setItem(themeStorageKey, theme.value);
    reflectThemePreference();
  };

  const reflectThemePreference = () => {
    document.firstElementChild?.setAttribute('data-theme', theme.value);

    document
      .querySelector('#theme-toggle')
      ?.setAttribute('aria-label', theme.value);
  };

  reflectThemePreference();

  // Sync with system changes
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', ({ matches: isDark }) => {
      theme.value = isDark ? 'dark' : 'light';
      setThemePreference();
    });
</script>

<!-- <div class="header-bg"> -->
<div class="grid header">
  <div class="logo">PD3 Vault Cracker</div>
  <div class="offlinemode">#OFFLINEMODE</div>
  <div class="links">
    <div
      class="icon theme-toggle"
      id="theme-toggle"
      title={$_(
        theme.value === 'light'
          ? 'header.theme_toggle.dark'
          : 'header.theme_toggle.light',
      )}
      aria-label="auto"
      aria-live="polite"
      aria-checked="false"
      on:click={toggleTheme}
      on:keydown={toggleTheme}
      role="checkbox"
      tabindex="0"
    >
      <!-- If theme.value is light show moon, otherwise sun -->
      {#if theme.value === 'light'}
        <MoonIcon />
      {:else}
        <SunIcon />
      {/if}
    </div>

    <div
      class="icon pointer"
      title={$_('header.help')}
      on:click={toggleHelpModal}
      on:keydown={toggleHelpModal}
      role="link"
      tabindex="0"
    >
      <HelpIcon />
    </div>

    <a href="https://github.com/SavageCore/pd3-vault-cracker" target="_blank">
      <div class="icon" title={$_('header.view_source')}>
        <GitubIcon />
      </div>
    </a>
  </div>
</div>
<!-- </div> -->

<Modal isOpen={isModalOpen} onClose={toggleHelpModal} />

<style src="./style.scss">
</style>
