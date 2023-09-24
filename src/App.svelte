<script lang="ts">
  import { isLoading } from 'svelte-i18n';

  import Footer from './components/footer/index.svelte';
  import Header from './components/header/index.svelte';
  import Keypad from './components/keypad/index.svelte';
  import Modal from './components/modals/install_prompt/index.svelte';

  let isModalOpen = false;
  // eslint-disable-next-line no-undef
  let deferredPrompt: BeforeInstallPromptEvent | undefined;

  const isInstalled = window.matchMedia('(display-mode: standalone)').matches;

  if (isInstalled) {
    // Remove the stored preference
    localStorage.removeItem('install-denied');
  }

  window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default install prompt
    event.preventDefault();

    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
    const isInstallDenied = localStorage.getItem('install-denied') === 'true';

    // Do not show the prompt if the app is already installed or install was denied
    if (isInstalled || isInstallDenied) {
      return;
    }

    // Store the event for later use
    // eslint-disable-next-line no-undef
    deferredPrompt = event as BeforeInstallPromptEvent;
    showInstallPrompt();
  });

  const showInstallPrompt = () => {
    isModalOpen = true;
  };

  const toggleModal = () => {
    isModalOpen = !isModalOpen;
  };

  const installApp = () => {
    // Show the original saved install prompt
    deferredPrompt?.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt?.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        // Remove the stored preference
        localStorage.removeItem('install-denied');
        // Hide the modal
        toggleModal();
      }
    });
  };

  const installDenied = () => {
    // Store the user's preference
    localStorage.setItem('install-denied', 'true');
    toggleModal();
  };
</script>

{#if $isLoading}
  <main class="container">
    <p aria-busy="true">Please wait...</p>
  </main>
{:else}
  <Header />
  <main class="container">
    <Keypad />
  </main>
  <Footer />

  <Modal
    isOpen="{isModalOpen}"
    onClose="{toggleModal}"
    onInstall="{installApp}"
    onInstallDenied="{installDenied}"
  />
{/if}

<style>
</style>
