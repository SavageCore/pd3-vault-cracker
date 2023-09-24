<script>
  import { _ } from 'svelte-i18n';

  import GitIcon from '../../assets/icons/git.svelte';

  let ghCommitHash = '#{GH_COMMIT_HASH}#';
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
      href="https://github.com/SavageCore/pd3-vault-cracker/commit/{ghCommitHash}"
      target="_blank"
    >
      {ghCommitHash.slice(0, 7)}
    </a>
  </div>
</div>

<style src="./style.scss">
</style>
