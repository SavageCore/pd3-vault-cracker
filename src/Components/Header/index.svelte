<script>
    import HelpIcon from '@Components/Icons/Help.svelte';
    import GitubIcon from '@Components/Icons/Github.svelte';
    import Modal from '@Components/Modal/index.svelte';

    let showModal = false;

    function onHelpClick() {
        showModal = true;
    }
</script>

<style src="./style.scss">

</style>

<div class="background">
    <div class="wrapper">
        <div class="header">
            <div class="logo">PD3 Vault Cracker</div>
            <div class="icons">
                <div
                    class="icon pointer"
                    title="Help"
                    on:click={onHelpClick}
                    on:keydown={onHelpClick}>
                    <HelpIcon />
                </div>

                <a
                    href="https://github.com/SavageCore/pd3-vault-cracker"
                    target="_blank">
                    <div class="icon" title="View source">
                        <GitubIcon />
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>

<Modal bind:showModal>
    <h2 slot="header">Help</h2>

    <p>
        This tool helps you to find the correct combination for the vault in
        Payday 3.
    </p>
    <br />
    <p>
        Enter the 2, 3 or 4 digits from the fingerprints on the vault keypad
        then click the
        <span class="green">✔</span>
        button to calculate the possible combinations.
    </p>
    <br />
    <p>
        To remove the entered digits click the
        <span class="red">✘</span>
        button.
    </p>
    <br />
    <h3>Keybinds</h3>
    <br />
    <ol>
        <li>Enter/Return - Calculate combinations</li>
        <li>Backspace/Delete - Remove last entered digit</li>
        <li>Escape - Clear entered digits</li>
    </ol>
    <br />
    <h3>Issues</h3>
    <br />
    <p>
        Please post any issues on
        <a
            href="https://github.com/SavageCore/pd3-vault-cracker/issues"
            target="_blank">
            GitHub
        </a>
        or DM me
        <a
            href="https://www.reddit.com/message/compose/?to=SavageCore"
            target="_blank">
            /u/SavageCore.
        </a>
    </p>
</Modal>
