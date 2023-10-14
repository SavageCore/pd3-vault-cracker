<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { writable, type Writable } from 'svelte/store';

  export let isOpen = false;
  export let onClose = () => {};
  export let onClear = () => {};
  export let combinations: number[][] = [];
  export let combination: Writable<number[]> = writable([]);

  let combinationPrint: string = '';

  combination.subscribe((value) => {
    combinationPrint = value.join('');
  });

  const handleClick = () => {
    onClose();
  };

  const toggleTried = (event: Event) => {
    const button = event.target as HTMLButtonElement;

    // Toggle the button's class
    button.classList.toggle('tried');
    button.classList.remove('correct');
  };

  const toggleCorrect = (event: Event) => {
    const targetButton = event.target as HTMLButtonElement;

    // Toggle the button's class
    targetButton.classList.toggle('correct');
    targetButton.classList.remove('tried');

    // Find any other buttons with correct class and remove it
    const buttons = document.querySelectorAll('.combo-btn.correct');
    for (const button of buttons) {
      if (button === targetButton) {
        continue;
      }

      button.classList.remove('correct');
    }
  };
</script>

<dialog open="{isOpen}">
  <article>
    <header>
      <a href="#close" aria-label="Close" class="close" on:click="{handleClick}"
      ></a>
      {$_('header.view_all_combos_modal.header')}
      {combinationPrint}
    </header>
    <p>Left-click on a combination to mark it as tried</p>
    <p>Right-click/long-press on a combination to mark it as correct</p>
    <br />

    {#if combinations.length === 0}
      <p>No combos found.</p>
    {:else}
      <div class="grid combo">
        {#each combinations as combo}
          <button
            class="combo-btn btn-inverted"
            on:click="{toggleTried}"
            on:contextmenu|preventDefault="{toggleCorrect}"
          >
            {combo.join('')}
          </button>
        {/each}
      </div>
      <!-- Clear button -->
      <button class="btn-inverted clear-btn" on:click="{() => onClear()}">
        {$_('header.view_all_combos_modal.clear')}
      </button>
    {/if}
  </article>
</dialog>

<style src="./style.scss"></style>
