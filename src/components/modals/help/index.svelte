<script>
  import { _ } from 'svelte-i18n';

  import MoonIcon from '../../../assets/icons/moon.svelte';
  import SunIcon from '../../../assets/icons/sun.svelte';
  import CheckIcon from '../../../assets/icons/check.svelte';
  import CrossIcon from '../../../assets/icons/cross.svelte';

  export let isOpen = false;
  export let onClose = () => {};

  function handleClick() {
    onClose();
  }
</script>

<dialog open="{isOpen}">
  <article>
    <header>
      <a href="#close" aria-label="Close" class="close" on:click="{handleClick}"
      ></a>
      {$_('header.help_modal.header')}
    </header>
    <p>
      This tool helps you to find the correct combination for the vault in
      Payday 3.
    </p>
    <p>
      Enter the 2, 3 or 4 digits from the fingerprints on the vault keypad then
      click the
      <span class="green"><CheckIcon size="1rem" /></span>
      button to calculate the possible combinations.
    </p>
    <p>
      To remove the entered digits click the
      <span class="red"><CrossIcon size="1rem" /></span>
      button.
    </p>
    <p>
      Click on the <SunIcon size="1rem" /> or
      <MoonIcon size="1rem" /> icon to toggle between light and dark mode.
    </p>
    <h3>Keybinds</h3>
    <ol>
      <li>Enter/Return - Calculate combinations</li>
      <li>Backspace/Delete - Remove last entered digit</li>
      <li>Escape - Clear entered digits</li>
    </ol>
    <h3>Issues</h3>
    <p>
      Please post any issues on
      <a
        href="https://github.com/SavageCore/pd3-vault-cracker/issues"
        target="_blank"
      >
        GitHub
      </a>
      or DM
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
