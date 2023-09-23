<script lang="ts">
  import Modal from '../modal/index.svelte';

  import GitubIcon from '../../assets/icons/github.svelte';
  import HelpIcon from '../../assets/icons/help.svelte';
  import MoonIcon from '../../assets/icons/moon.svelte';
  import SunIcon from '../../assets/icons/sun.svelte';

  let isModalOpen = false;
  const themeStorageKey = 'theme-preference';

  const getColorPreference = () => {
    if (localStorage.getItem(themeStorageKey)) {
      return localStorage.getItem(themeStorageKey)!;
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
    document.firstElementChild!.setAttribute('data-theme', theme.value);

    document
      .querySelector('#theme-toggle')
      ?.setAttribute('aria-label', theme.value);
  };

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
  <div class="OFFLINEMODE">#OFFLINEMODE</div>
  <div class="links">
    <div
      class="icon theme-toggle"
      id="theme-toggle"
      title="{theme.value === 'light' ? 'Dark theme' : 'Light theme'}"
      aria-label="auto"
      aria-live="polite"
      aria-checked="false"
      on:click="{toggleTheme}"
      on:keydown="{toggleTheme}"
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
      title="Help"
      on:click="{toggleHelpModal}"
      on:keydown="{toggleHelpModal}"
      role="link"
      tabindex="0"
    >
      <HelpIcon />
    </div>

    <a href="https://github.com/SavageCore/pd3-vault-cracker" target="_blank">
      <div class="icon" title="View source">
        <GitubIcon />
      </div>
    </a>
  </div>
</div>
<!-- </div> -->

<Modal isOpen="{isModalOpen}" onClose="{toggleHelpModal}" />

<style src="./style.scss">
</style>
