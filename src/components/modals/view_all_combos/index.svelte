<script lang="ts">
  import { type Writable, writable } from 'svelte/store';
  import { _ } from 'svelte-i18n';

  import ComboGrid from './combo_grid/index.svelte';

  export let isOpen = false;
  export let onClose = () => {};
  export let onClear = () => {};
  export let combinations: number[][] = [];
  export let combination: Writable<number[]> = writable([]);
  export let triedCombinations: Writable<number[][]> = writable([]);

  let combinationPrint: string = '';

  combination.subscribe((value) => {
    combinationPrint = value.join('');
  });

  const handleClick = () => {
    onClose();
  };
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
      {$_('header.view_all_combos_modal.header')}
      {combinationPrint}
    </header>
    <p>{$_('header.view_all_combos_modal.hint_tried')}</p>
    <p>{$_('header.view_all_combos_modal.hint_correct')}</p>
    <br>

    {#if combinations.length === 0}
      <p>{$_('header.view_all_combos_modal.empty')}</p>
    {:else}
      <ComboGrid {combinations} {triedCombinations} {onClear} />
    {/if}
  </article>
</dialog>

<style src="./style.scss"></style>
