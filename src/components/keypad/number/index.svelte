<script lang="ts">
  export let number = 0;
  export let onKeypadInput: (input: string) => void = () => {};
  export let clearNumber: (input: number) => void = () => {};
</script>

<button
  class="btn"
  data-value="{number}"
  on:click="{() => onKeypadInput(number.toString())}"
  on:contextmenu|preventDefault="{() => clearNumber(number)}"
>
  {number}
</button>
