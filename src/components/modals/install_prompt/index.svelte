<script>
  import { _ } from 'svelte-i18n';

  export let isOpen = false;
  export let onClose = () => {};
  export let onInstallDenied = () => {};
  export let onInstall = () => {};

  const handleCloseClick = () => {
    onClose();
  };

  const handleCancelClick = () => {
    onInstallDenied();
  };

  const handleInstallClick = () => {
    onInstall();
  };
</script>

<dialog open="{isOpen}">
  <article>
    <header>
      <a
        href="#close"
        aria-label="Close"
        class="close"
        on:click="{handleCloseClick}"
      ></a>
      {$_('header.install_modal.header')}
    </header>
    <p>
      Do you want to install this app on your device? This will allow you to
      launch from your home screen and use whilst offline.
    </p>
    <p>
      If you choose to cancel, you will not be asked again. You can still
      install the app manually by clicking the install icon in the address bar
      or under the 3 dot menu.
    </p>
    <div class="grid">
      <button class="warning" on:click="{handleCancelClick}">Cancel</button>
      <button on:click="{handleInstallClick}">Install</button>
    </div>
  </article>
</dialog>

<style src="./style.scss"></style>
