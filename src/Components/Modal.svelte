<script>
    export let showModal; // boolean

    let dialog; // HTMLDialogElement

    $: if (dialog && showModal) dialog.showModal();
</script>

<style>
    dialog {
        max-width: 32em;
        border-radius: 0.2em;
        border: 1px solid #333;
        padding: 0;
        background-color: #1c1b22;
        color: #fff;
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }
    dialog > div {
        padding: 1em;
    }
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    button {
        display: block;
        margin-top: 1rem;
    }
</style>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
    bind:this={dialog}
    on:close={() => (showModal = false)}
    on:click|self={() => dialog.close()}>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation>
        <slot name="header" />
        <hr />
        <slot />
        <!-- <hr /> -->
        <!-- svelte-ignore a11y-autofocus -->
        <button autofocus on:click={() => dialog.close()}>Close</button>
    </div>
</dialog>
