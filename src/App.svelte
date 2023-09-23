<script lang="ts">
  import { isLoading } from 'svelte-i18n';

  import Footer from './components/footer/index.svelte';
  import Header from './components/header/index.svelte';
  import Keypad from './components/keypad/index.svelte';
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
{/if}

<style>
</style>
