<script>
    import Layout from '@Components/Layout';
    import Header from '@Components/Header';
    import Footer from '@Components/Footer';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    // https://i.imgur.com/NKHNmfr.png
    // https://codepen.io/noleli/pen/abbeWRL
    // https://www.reddit.com/r/paydaytheheist/comments/15jvvpq/payday_3_beta_vault_code_generator_from/
    // https://www.onlinegdb.com/jMsyIVl33

    export const pressedNumbers = writable([]);
    let combinations = [];
    let currentCombination = 0;
    let code = null;

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        code = params.get('code');

        if (code) {
            pressedNumbers.update(numbers => [...numbers, ...code.split('')]);
            start();
        }
    });

    window.addEventListener('keydown', event => {
        const keyPressed = event.key;

        if (keyPressed >= 0 && keyPressed <= 9) {
            onKeypadInput(parseInt(keyPressed));
        }

        if (keyPressed === 'Backspace' || keyPressed === 'Delete') {
            onKeypadInput('Backspace');
        }

        if (keyPressed === 'Enter' || keyPressed === 'Return') {
            onKeypadInput('OK');
        }

        if (keyPressed === 'Escape') {
            pressedNumbers.update(numbers => []);
            combinations = [];
            currentCombination = 0;

            const params = new URLSearchParams(window.location.search);
            params.delete('code');
            window.history.replaceState(
                {},
                '',
                `${location.pathname}?${params}`,
            );
        }
    });

    function onKeypadInput(input) {
        if (input === 'Backspace') {
            pressedNumbers.update(numbers => numbers.slice(0, -1));
            combinations = [];
            currentCombination = 0;

            if ($pressedNumbers.length === 0) {
                const params = new URLSearchParams(window.location.search);
                params.delete('code');
                window.history.replaceState(
                    {},
                    '',
                    `${location.pathname}?${params}`,
                );
            }

            return;
        }

        if (input === 'OK') {
            start();
            return;
        }

        // Prevent the user from entering the same number twice
        if ($pressedNumbers.includes(input)) {
            return;
        }

        pressedNumbers.update(numbers => [...numbers, input]);

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

        const params = new URLSearchParams(window.location.search);
        params.set('code', fingerprints.join(''));
        window.history.replaceState({}, '', `${location.pathname}?${params}`);
    }

    function generateCombinations(fingerprints) {
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
</script>

<style src="./style.scss">

</style>

<Layout>
    <Header />
    <div class="wrapper">
        <div class="content">
            <div class="atm-keypad">
                <!-- Display -->
                <div class="display">
                    <!-- Keypad display 4 asterisks, replaced with numbers -->
                    {#each Array(4) as _, i}
                        <!-- If pressedNumbers[i] print otherwise * -->
                        {#if $pressedNumbers[i] !== undefined}
                            {$pressedNumbers[i]}
                        {:else}*{/if}
                    {/each}
                </div>
                <!-- Keypad -->
                <div class="keypad">
                    <div class="row">
                        <button class="btn" on:click={() => onKeypadInput(1)}>
                            1
                        </button>
                        <button class="btn" on:click={() => onKeypadInput(2)}>
                            2
                        </button>
                        <button class="btn" on:click={() => onKeypadInput(3)}>
                            3
                        </button>
                    </div>
                    <div class="row">
                        <button class="btn" on:click={() => onKeypadInput(4)}>
                            4
                        </button>
                        <button class="btn" on:click={() => onKeypadInput(5)}>
                            5
                        </button>
                        <button class="btn" on:click={() => onKeypadInput(6)}>
                            6
                        </button>
                    </div>
                    <div class="row">
                        <button class="btn" on:click={() => onKeypadInput(7)}>
                            7
                        </button>
                        <button class="btn" on:click={() => onKeypadInput(8)}>
                            8
                        </button>
                        <button class="btn" on:click={() => onKeypadInput(9)}>
                            9
                        </button>
                    </div>
                    <div class="row">
                        <button
                            class="btn red"
                            on:click={() => onKeypadInput('Backspace')}>
                            ✘
                        </button>
                        <button class="btn" on:click={() => onKeypadInput(0)}>
                            0
                        </button>
                        <button
                            class="btn green"
                            on:click={() => onKeypadInput('OK')}>
                            ✔
                        </button>
                    </div>
                </div>
            </div>

            <!-- Combination display -->
            <!-- Display each combination in turn with a button to go to the next one -->
            <!-- Tell user when they reach the end -->
            <div class="combinationDisplayContainer">
                <!-- if combinations is not empty -->
                {#if combinations.length > 0 && currentCombination < combinations.length}
                    <div class="combinationDisplay">
                        {combinations[currentCombination].join(' ')}
                    </div>
                    <div>
                        Attempt {currentCombination + 1} of {combinations.length}
                    </div>
                    <!-- Next button -->
                    <div>
                        <button
                            class="btn"
                            on:click={() => {
                                currentCombination += 1;
                            }}>
                            Next
                        </button>
                    </div>
                {:else if combinations.length > 0 && currentCombination >= combinations.length}
                    <div>
                        <p>End of combinations</p>
                        <button
                            class="btn"
                            on:click={() => {
                                onKeypadInput('OK');
                            }}>
                            Start again
                        </button>
                    </div>
                {/if}
            </div>
        </div>
    </div>
    <Footer />
</Layout>
