<script lang="ts">
  import { onMount } from 'svelte';
  import { writable, type Writable } from 'svelte/store';

  import Modal from '../modals/view_all_combos/index.svelte';
  import CheckIcon from '../../assets/icons/check.svelte';
  import CrossIcon from '../../assets/icons/cross.svelte';
  import NumberKey from './number/index.svelte';

  // https://i.imgur.com/NKHNmfr.png
  // https://codepen.io/noleli/pen/abbeWRL
  // https://www.reddit.com/r/paydaytheheist/comments/15jvvpq/payday_3_beta_vault_code_generator_from/
  // https://www.onlinegdb.com/jMsyIVl33

  export const pressedNumbers: Writable<number[]> = writable([]);
  export const triedCombinations: Writable<number[][]> = writable([]);
  let combinations: number[][] = [];
  let currentCombination = 0;
  let code: string | null = null;
  let isModalOpen = false;

  $: modalCombinations = combinations;
  $: modalTriedCombinations = triedCombinations;
  $: modalCurrentCombination = pressedNumbers;

  onMount(() => {
    if (!code) {
      const params = new URLSearchParams(window.location.search);
      code = params.get('code');
    }

    if (
      code &&
      code.length >= 2 &&
      code.length <= 4 &&
      !isNaN(parseInt(code))
    ) {
      const fingerprints = code.split('').map((number) => parseInt(number));

      for (const fingerprint of fingerprints) {
        toggleButton(fingerprint.toString());
      }

      pressedNumbers.update(
        (numbers) => [...numbers, ...fingerprints] as never[],
      );
      start();
    }
  });

  window.addEventListener('keydown', (event) => {
    const keyPressed = event.key;

    if (/^[0-9]$/.test(keyPressed)) {
      onKeypadInput(keyPressed);
    }

    if (keyPressed === 'Backspace' || keyPressed === 'Delete') {
      onKeypadInput('Backspace');
    }

    if (keyPressed === 'Enter' || keyPressed === 'Return') {
      onKeypadInput('OK');
    }

    if (keyPressed === 'Escape') {
      clearKeyPad();
    }
  });

  function onKeypadInput(input: string): void {
    if (input === 'Backspace') {
      // Clear .pressed numbers
      if ($pressedNumbers.length > 0) {
        const lastNumber = $pressedNumbers[$pressedNumbers.length - 1];
        if (lastNumber !== undefined) {
          toggleButton(lastNumber.toString());
        }
      }

      pressedNumbers.update((numbers) => numbers.slice(0, -1));
      combinations = [];
      currentCombination = 0;

      if ($pressedNumbers.length === 0) {
        clearKeyPad();
      }

      return;
    }

    if (input === 'OK') {
      start();
      return;
    }

    // If user has entered 4 numbers, don't allow any more
    if ($pressedNumbers.length >= 4) {
      return;
    }

    // Prevent the user from entering the same number twice
    if ($pressedNumbers.includes(Number(input))) {
      return;
    }

    toggleButton(input);

    pressedNumbers.update((numbers) => [...numbers, Number(input)] as never[]);

    // If the user has entered 4 numbers, start the cracking process
    if ($pressedNumbers.length === 4) {
      start();
    }
  }

  function start() {
    const fingerprints = $pressedNumbers;
    currentCombination = 0;

    // Ensure that the user has entered 2, 3 or 4 numbers
    if (fingerprints.length < 2 || fingerprints.length > 4) {
      return;
    }

    combinations = generateCombinations(fingerprints);
    // Clear tried combinations
    triedCombinations.update(() => []);

    const params = new URLSearchParams(window.location.search);
    params.set('code', fingerprints.join(''));
    window.history.replaceState({}, '', `${location.pathname}?${params}`);
  }

  function generateCombinations(fingerprints: number[]) {
    let combinations = [];

    for (let i = 0; i < fingerprints.length; i++) {
      for (let j = 0; j < fingerprints.length; j++) {
        for (let k = 0; k < fingerprints.length; k++) {
          for (let l = 0; l < fingerprints.length; l++) {
            const combination = [
              fingerprints[i],
              fingerprints[j],
              fingerprints[k],
              fingerprints[l],
            ];
            const uniqueCombination = [...new Set(combination)]; // Remove duplicates
            if (uniqueCombination.length === fingerprints.length) {
              combinations.push(combination);
            }
          }
        }
      }
    }

    // Sort combinations
    combinations.sort((a, b) => {
      return a[0] - b[0] || a[1] - b[1] || a[2] - b[2] || a[3] - b[3];
    });

    return combinations;
  }

  const toggleModal = () => {
    isModalOpen = !isModalOpen;
  };

  const viewAllCombinations = () => {
    isModalOpen = true;
  };

  const toggleButton = (number: string) => {
    // Find the button that was pressed
    const button = document.querySelector(`.btn[data-value="${number}"]`)!;
    button.classList.toggle('pressed');
  };

  // Remove tried and correct classes from all buttons
  const clearModalButtons = () => {
    const buttons = document.querySelectorAll('.combo-btn');
    for (const button of buttons) {
      button.classList.remove('tried');
      button.classList.remove('correct');
    }
  };

  const clearKeyPad = () => {
    const numbers = $pressedNumbers;

    // Clear the .pressed numbers
    for (const number of numbers) {
      toggleButton(number.toString());
    }

    pressedNumbers.update(() => []);
    combinations = [];
    triedCombinations.update(() => []);
    currentCombination = 0;

    const params = new URLSearchParams(window.location.search);
    params.delete('code');
    window.history.replaceState({}, '', `${location.pathname}?${params}`);
  };

  const clearNumber = (number: number) => {
    toggleButton(number.toString());
    pressedNumbers.update((numbers) => numbers.filter((n) => n !== number));

    combinations = [];
    currentCombination = 0;

    if ($pressedNumbers.length === 0) {
      clearKeyPad();
    }
  };
</script>

<div class="atm-keypad">
  <!-- Display -->
  <div class="display">
    <!-- Current combination -->
    {#if combinations.length > 0 && currentCombination < combinations.length}
      {combinations[currentCombination].join('')}
    {:else if combinations.length > 0 && currentCombination >= combinations.length}
      x x x x
    {:else}
      <!-- Current fingerprints entered -->
      <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
      {#each Array(4) as _, i}
        {#if $pressedNumbers[i] !== undefined}
          {$pressedNumbers[i]}
        {:else}*{/if}
      {/each}
    {/if}
  </div>
  <!-- Keypad -->
  <div class="keypad">
    {#each [[1, 2, 3], [4, 5, 6], [7, 8, 9]] as row}
      <div class="row">
        {#each row as number}
          <NumberKey {number} {onKeypadInput} {clearNumber} />
        {/each}
      </div>
    {/each}
    <div class="row">
      <button
        class="btn red"
        on:click="{() => onKeypadInput('Backspace')}"
        on:contextmenu|preventDefault="{clearKeyPad}"
      >
        <CrossIcon />
      </button>
      <NumberKey number="{0}" {onKeypadInput} {clearNumber} />
      <button
        class="btn green"
        on:click="{() => onKeypadInput('OK')}"
        on:contextmenu|preventDefault="{() => {}}"
      >
        <CheckIcon />
      </button>
    </div>
  </div>
</div>

<div class="combinationDisplayContainer">
  {#if combinations.length > 0 && currentCombination < combinations.length}
    <p class="attempts-display">
      Attempt {currentCombination + 1} of {combinations.length}
    </p>

    <!-- Next button -->
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a
      href="#"
      role="button"
      class="btn-inverted"
      title="Next combination"
      on:click="{() => {
        currentCombination += 1;
        // Add the current combination to the tried combinations
        triedCombinations.update((tried) => {
          const index = currentCombination - 1;
          if (index >= 0 && index < combinations.length) {
            return [...tried, combinations[index]];
          }
          return tried; // Return the original array if the index is out of bounds
        });
      }}"
    >
      Next
    </a>

    <!-- View all link -->
    <!-- svelte-ignore a11y-invalid-attribute -->
    <p>
      <a
        href="#"
        class="view-all-link"
        title="View all combinations"
        on:click="{() => viewAllCombinations()}">View all combinations</a
      >
    </p>
  {:else if combinations.length > 0 && currentCombination + 1 >= combinations.length}
    <p class="attempts-display">End of combinations</p>
    <!-- svelte-ignore a11y-invalid-attribute -->
    <a
      href="#"
      role="button"
      class="btn-inverted"
      on:click="{() => {
        onKeypadInput('OK');
      }}"
    >
      Start again
    </a>

    <p>&nbsp;</p>
  {:else}
    <p class="attempts-display">Enter known fingerprints</p>

    <!-- svelte-ignore a11y-invalid-attribute -->
    <a href="#" role="button" class="btn-inverted disabled">
      Waiting for input
    </a>

    <p>&nbsp;</p>
  {/if}
</div>

<Modal
  isOpen="{isModalOpen}"
  onClose="{toggleModal}"
  onClear="{clearModalButtons}"
  combinations="{modalCombinations}"
  triedCombinations="{modalTriedCombinations}"
  combination="{modalCurrentCombination}"
/>

<style src="./style.scss">
</style>
