<script>
    import Layout from '@Components/Layout';
    import Menu from '@Components/Menu';
    import { writable } from 'svelte/store';

    export const pressedNumbers = writable([]);

    let digit1 = '';
    let digit2 = '';
    let digit3 = '';
    let digit4 = '';

    function handleClick(input) {
        if (input === 'Backspace') {
            pressedNumbers.update(numbers => numbers.slice(0, -1));

            updateDisplay();
            return;
        }

        if (input === 'OK') {
            start();
            return;
        }

        pressedNumbers.update(numbers => [...numbers, input]);

        updateDisplay();

        // If the user has entered 4 numbers, start the cracking process
        if ($pressedNumbers.length === 4) {
            start();
        }
    }

    function start() {
        const fingerprints = $pressedNumbers;

        // Ensure that the user has entered 2, 3 or 4 numbers
        if (fingerprints.length < 2 || fingerprints.length > 4) {
            return;
        }

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

        console.log('');
        console.log('');
        console.log('');

        for (const combo of combinations) {
            if (combo[0] !== firstNumber) {
                firstNumber = combo[0];
                sectionCount += 1;
                console.log(`--- section ${sectionCount} ---`);
            }
            console.log(`(${combo.join(', ')})`);
        }
    }

    function numberToDigit(number) {
        switch (number) {
            case 1:
                return 'digOne';
            case 2:
                return 'digTwo';
            case 3:
                return 'digThree';
            case 4:
                return 'digFour';
            case 5:
                return 'digFive';
            case 6:
                return 'digSix';
            case 7:
                return 'digSeven';
            case 8:
                return 'digEight';
            case 9:
                return 'digNine';
            case 0:
                return 'digZero';
        }
    }

    function updateDisplay() {
        const numbers = $pressedNumbers;

        if (numbers.length === 0) {
            digit1 = '';
            digit2 = '';
            digit3 = '';
            digit4 = '';
        }

        if (numbers.length === 1) {
            digit1 = numberToDigit(numbers[0]);
            digit2 = '';
            digit3 = '';
            digit4 = '';
        }

        if (numbers.length === 2) {
            digit1 = numberToDigit(numbers[0]);
            digit2 = numberToDigit(numbers[1]);
            digit3 = '';
            digit4 = '';
        }

        if (numbers.length === 3) {
            digit1 = numberToDigit(numbers[0]);
            digit2 = numberToDigit(numbers[1]);
            digit3 = numberToDigit(numbers[2]);
            digit4 = '';
        }

        if (numbers.length === 4) {
            digit1 = numberToDigit(numbers[0]);
            digit2 = numberToDigit(numbers[1]);
            digit3 = numberToDigit(numbers[2]);
            digit4 = numberToDigit(numbers[3]);
        }
    }
</script>

<style src="./style.scss">

</style>

<Layout>
    <Menu />
    <div class="wrapper">
        <div class="content">
            <div class="atm-keypad">
                <!-- Display -->
                <div class="display">
                    <div class="digit {digit1}">
                        <div class="segment segA" />
                        <div class="segment segB" />
                        <div class="segment segC" />
                        <div class="segment segD" />
                        <div class="segment segE" />
                        <div class="segment segF" />
                        <div class="segment segG" />
                    </div>
                    <div class="digit {digit2}">
                        <div class="segment segA" />
                        <div class="segment segB" />
                        <div class="segment segC" />
                        <div class="segment segD" />
                        <div class="segment segE" />
                        <div class="segment segF" />
                        <div class="segment segG" />
                    </div>
                    <div class="digit {digit3}">
                        <div class="segment segA" />
                        <div class="segment segB" />
                        <div class="segment segC" />
                        <div class="segment segD" />
                        <div class="segment segE" />
                        <div class="segment segF" />
                        <div class="segment segG" />
                    </div>
                    <div class="digit {digit4}">
                        <div class="segment segA" />
                        <div class="segment segB" />
                        <div class="segment segC" />
                        <div class="segment segD" />
                        <div class="segment segE" />
                        <div class="segment segF" />
                        <div class="segment segG" />
                    </div>
                </div>
                <!-- Keypad -->
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
                    <div class="row">
                        <button
                            class="btn"
                            style="color: red;"
                            on:click={() => handleClick('Backspace')}>
                            X
                        </button>
                        <button class="btn" on:click={() => handleClick(0)}>
                            0
                        </button>
                        <button
                            class="btn"
                            style="color: green;"
                            on:click={() => handleClick('OK')}>
                            ✔
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</Layout>
