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

<dialog open={isOpen}>
  <article>
    <header>
      <a
        href="#close"
        aria-label={$_('common.close')}
        class="close"
        on:click={handleCloseClick}
      ></a>
      {$_('header.install_modal.header')}
    </header>
    <p>
      {$_('header.install_modal.body_intro')}
    </p>
    <p>
      {$_('header.install_modal.body_cancel_note')}
    </p>
    <div class="grid">
      <button class="warning" type="button" on:click={handleCancelClick}>
        {$_('header.install_modal.cancel')}
      </button>
      <button type="button" on:click={handleInstallClick}>
        {$_('header.install_modal.install')}
      </button>
    </div>
  </article>
</dialog>

<style src="./style.scss"></style>
