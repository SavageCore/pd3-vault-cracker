<script>
    import Layout from '@Components/Layout';
    import Menu from '@Components/Menu';
    import { writable } from 'svelte/store';

    export const pressedNumbers = writable([]);

    function handleClick(number) {
        pressedNumbers.update(numbers => [...numbers, number]);
    }

    function start() {
        const fingerprints = $pressedNumbers;
        console.log(fingerprints);
        printCombinations(fingerprints);
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

        return combinations;
    }

    function printCombinations(fingerprints) {
        const combinations = generateCombinations(fingerprints);
        combinations.sort(); // Sort combinations

        let sectionCount = 0;
        let firstNumber = -1;

        for (const combo of combinations) {
            if (combo[0] !== firstNumber) {
                firstNumber = combo[0];
                sectionCount += 1;
                console.log(`--- section ${sectionCount} ---`);
            }
            console.log(`(${combo.join(', ')})`);
        }

        // combinations.forEach((combo, index) => {
        //     if (combo[0] !== firstNumber) {
        //         firstNumber = combo[0];
        //         sectionCount += 1;
        //         console.log(`--- section ${sectionCount} ---`);
        //     }
        //     console.log(`(${combo.join(', ')})`);
        // });
    }

    printCombinations([2, 4, 8, 0]);
</script>

<style src="./style.scss">

</style>

<Layout>
    <Menu />
    <div class="wrapper">
        <div class="content">
            <div class="keypad">
                <div class="row">
                    <button class="btn" on:click={() => handleClick(1)}>
                        1
                    </button>
                    <button class="btn" on:click={() => handleClick(2)}>
                        2
                    </button>
                    <button class="btn" on:click={() => handleClick(3)}>
                        3
                    </button>
                </div>
                <div class="row">
                    <button class="btn" on:click={() => handleClick(4)}>
                        4
                    </button>
                    <button class="btn" on:click={() => handleClick(5)}>
                        5
                    </button>
                    <button class="btn" on:click={() => handleClick(6)}>
                        6
                    </button>
                </div>
                <div class="row">
                    <button class="btn" on:click={() => handleClick(7)}>
                        7
                    </button>
                    <button class="btn" on:click={() => handleClick(8)}>
                        8
                    </button>
                    <button class="btn" on:click={() => handleClick(9)}>
                        9
                    </button>
                </div>
            </div>
            <!-- The button to start the cracking process -->
            <div class="start-btn">
                <button class="btn" on:click={() => start()}>Start</button>
            </div>
        </div>
    </div>
</Layout>
