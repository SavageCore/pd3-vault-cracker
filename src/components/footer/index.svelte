<script>
  import { _ } from 'svelte-i18n';

  import GitIcon from '../../assets/icons/git.svelte';

  let ghTag = '#{GH_TAG}#';
</script>

<div class="grid footer">
  <div></div>
  <div class="made-by">
    {$_('footer.made-by.text')}<a
      href="https://github.com/SavageCore"
      target="_blank"><span class="bold">SavageCore</span></a
    >
  </div>
  <div class="version">
    <div class="icon">
      <GitIcon />
    </div>
    <a
      href="https://github.com/SavageCore/pd3-vault-cracker/releases/tag/{ghTag}"
      target="_blank"
    >
      {ghTag}
    </a>
  </div>
</div>

<style src="./style.scss">
</style>
