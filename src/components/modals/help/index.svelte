<script>
  import { _ } from 'svelte-i18n';
  import CheckIcon from '../../../assets/icons/check.svelte';
  import CrossIcon from '../../../assets/icons/cross.svelte';
  import MoonIcon from '../../../assets/icons/moon.svelte';
  import SunIcon from '../../../assets/icons/sun.svelte';

  export let isOpen = false;
  export let onClose = () => {};

  function handleClick() {
    onClose();
  }
</script>

<dialog open={isOpen}>
  <article>
    <header>
      <a
        href="#close"
        aria-label={$_('common.close')}
        class="close"
        on:click={handleClick}
      ></a>
      {$_('header.help_modal.header')}
    </header>
    <p>
      {$_('header.help_modal.intro')}
    </p>
    <p>
      {$_('header.help_modal.enter_before')}
      <span class="green"><CheckIcon size="1rem" /></span>
      {$_('header.help_modal.enter_after')}
    </p>
    <p>
      {$_('header.help_modal.remove_before')}
      <span class="red"><CrossIcon size="1rem" /></span>
      {$_('header.help_modal.remove_after')}
    </p>
    <p>
      {$_('header.help_modal.theme_before')}
      <SunIcon size="1rem" />
      {$_('header.help_modal.theme_or')}
      <MoonIcon size="1rem" />
      {$_('header.help_modal.theme_after')}
    </p>
    <h3>{$_('header.help_modal.keybinds')}</h3>
    <ol>
      <li>{$_('header.help_modal.keybind_calculate')}</li>
      <li>{$_('header.help_modal.keybind_remove')}</li>
      <li>{$_('header.help_modal.keybind_clear')}</li>
      <li>{$_('header.help_modal.keybind_digits')}</li>
    </ol>
    <h3>{$_('header.help_modal.issues')}</h3>
    <p>
      {$_('header.help_modal.issues_before')}
      <a
        href="https://github.com/SavageCore/pd3-vault-cracker/issues"
        target="_blank"
      >
        {$_('header.help_modal.issues_github')}
      </a>
      {$_('header.help_modal.issues_middle')}
      <a
        href="https://www.reddit.com/message/compose/?to=SavageCore"
        target="_blank"
      >
        /u/SavageCore</a
      >
    </p>
  </article>
</dialog>

<style src="./style.scss"></style>
