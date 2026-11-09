<script lang="ts">
  import { onDestroy } from 'svelte';
  import { type Writable, writable } from 'svelte/store';

  import { _ } from 'svelte-i18n';

  export let combinations: number[][] = [];
  export let triedCombinations: Writable<number[][]> = writable([]);
  export let onClear = () => {};

  // Mark the combination as tried, based on triedCombinations, which is set in keypad when pressing next
  const unsubscribe = triedCombinations.subscribe((value) => {
    // If the value is empty, remove all tried classes
    if (value.length === 0) {
      const buttons = document.querySelectorAll('.combo-btn');
      for (const button of buttons) {
        button.classList.remove('tried');
      }
      return;
    }

    for (const triedCombination of value) {
      const buttons = document.querySelectorAll('.combo-btn');
      for (const button of buttons) {
        if (
          button.getAttribute('data-combination') === triedCombination.join('')
        ) {
          button.classList.add('tried');
        }
      }
    }
  });

  onDestroy(unsubscribe);

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

<div class="grid combo">
  {#each combinations as combo (combo.join(''))}
    <button
      class="combo-btn btn-inverted"
      type="button"
      on:click={toggleTried}
      on:contextmenu|preventDefault={toggleCorrect}
      data-combination={combo.join('')}
    >
      {combo.join('')}
    </button>
  {/each}
</div>
<!-- Clear button -->
<button class="btn-inverted clear-btn" type="button" on:click={() => onClear()}>
  {$_('header.view_all_combos_modal.clear')}
</button>

<style src="./style.scss"></style>
