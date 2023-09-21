<script>
    import GitIcon from '../Icons/Git.svelte';

    let ghCommitHash = '#{GH_COMMIT_HASH}#';
</script>

<style src="./style.scss">

</style>

<div class="background">
    <div class="footer">
        <div class="made_by">
            Made with 🔫 by &nbsp;
            <a href="https://github.com/SavageCore" target="_blank">
                SavageCore
            </a>
        </div>
        <div class="version">
            <div class="icon">
                <GitIcon />
            </div>
            <a
                href="https://github.com/SavageCore/pd3-vault-cracker/commit/{ghCommitHash}"
                target="_blank">
                {ghCommitHash.slice(0, 7)}
            </a>
        </div>
    </div>
</div>
