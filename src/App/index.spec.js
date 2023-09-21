import App from './index.svelte'
import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/svelte'

describe('App', () => {
    it('should render the app', () => {
        const { container } = render(App)

        expect(container).toMatchSnapshot()
    })

    it('should disallow duplicate number entry', async () => {
        const { container } = render(App)

        const oneButton = container.querySelector('div.keypad > div:nth-child(1) > button:nth-child(1)')
        const twoButton = container.querySelector('div.keypad > div:nth-child(1) > button:nth-child(2)')
        await fireEvent.click(oneButton)

        const display = container.querySelector('div.display')
        expect(display.textContent).toBe('1***')

        await fireEvent.click(oneButton)
        expect(display.textContent).toBe('1***')

        await fireEvent.click(twoButton)
        expect(display.textContent).toBe('12**')
    })

    it('should give 14 combinations for 2 digit input', async () => {
        const { container } = render(App)

        const display = container.querySelector('div.display')
        const oneButton = container.querySelector('div.keypad > div:nth-child(1) > button:nth-child(1)')
        const twoButton = container.querySelector('div.keypad > div:nth-child(1) > button:nth-child(2)')
        const enterButton = container.querySelector('div.keypad > div:nth-child(4) > button:nth-child(3)')

        await fireEvent.keyDown(document.body, { key: 'Escape' })

        expect(display.textContent).toBe('****')

        await fireEvent.click(oneButton)
        await fireEvent.click(twoButton)

        expect(display.textContent).toBe('12**')

        await fireEvent.click(enterButton)

        const combinations = container.querySelector('div.combinationDisplayContainer > div:nth-child(2)')
        expect(combinations.textContent).toBe('Attempt 1 of 14')
    })

    it('should give 36 combinations for 3 digit input', async () => {
        const { container } = render(App)

        const display = container.querySelector('div.display')
        const oneButton = container.querySelector('div.keypad > div:nth-child(1) > button:nth-child(1)')
        const twoButton = container.querySelector('div.keypad > div:nth-child(1) > button:nth-child(2)')
        const threeButton = container.querySelector('div.keypad > div:nth-child(1) > button:nth-child(3)')
        const enterButton = container.querySelector('div.keypad > div:nth-child(4) > button:nth-child(3)')

        await fireEvent.keyDown(document.body, { key: 'Escape' })

        expect(display.textContent).toBe('****')

        await fireEvent.click(oneButton)
        await fireEvent.click(twoButton)
        await fireEvent.click(threeButton)

        expect(display.textContent).toBe('123*')

        await fireEvent.click(enterButton)

        const combinations = container.querySelector('div.combinationDisplayContainer > div:nth-child(2)')
        expect(combinations.textContent).toBe('Attempt 1 of 36')
    })

    it('should give 24 combinations for 4 digit input', async () => {
        const { container } = render(App)

        const display = container.querySelector('div.display')
        const oneButton = container.querySelector('div.keypad > div:nth-child(1) > button:nth-child(1)')
        const twoButton = container.querySelector('div.keypad > div:nth-child(1) > button:nth-child(2)')
        const threeButton = container.querySelector('div.keypad > div:nth-child(1) > button:nth-child(3)')
        const fourButton = container.querySelector('div.keypad > div:nth-child(2) > button:nth-child(1)')
        const enterButton = container.querySelector('div.keypad > div:nth-child(4) > button:nth-child(3)')

        await fireEvent.keyDown(document.body, { key: 'Escape' })

        expect(display.textContent).toBe('****')

        await fireEvent.click(oneButton)
        await fireEvent.click(twoButton)
        await fireEvent.click(threeButton)
        await fireEvent.click(fourButton)

        expect(display.textContent).toBe('1234')

        await fireEvent.click(enterButton)

        const combinations = container.querySelector('div.combinationDisplayContainer > div:nth-child(2)')
        expect(combinations.textContent).toBe('Attempt 1 of 24')
    })

    it('should delete a digit when ✘ button pressed', async () => {
        const { container } = render(App)

        const display = container.querySelector('div.display')
        const oneButton = container.querySelector('div.keypad > div:nth-child(1) > button:nth-child(1)')
        const twoButton = container.querySelector('div.keypad > div:nth-child(1) > button:nth-child(2)')
        const deleteButton = container.querySelector('div.keypad > div:nth-child(4) > button:nth-child(1)')

        await fireEvent.keyDown(document.body, { key: 'Escape' })

        expect(display.textContent).toBe('****')

        await fireEvent.click(oneButton)
        await fireEvent.click(twoButton)

        expect(display.textContent).toBe('12**')

        await fireEvent.click(deleteButton)

        expect(display.textContent).toBe('1***')
    })

    it('should sort the combinations', async () => {
        const { container } = render(App)

        const display = container.querySelector('div.display')
        const oneButton = container.querySelector('div.keypad > div:nth-child(1) > button:nth-child(1)')
        const twoButton = container.querySelector('div.keypad > div:nth-child(1) > button:nth-child(2)')
        const enterButton = container.querySelector('div.keypad > div:nth-child(4) > button:nth-child(3)')

        await fireEvent.keyDown(document.body, { key: 'Escape' })

        expect(display.textContent).toBe('****')

        await fireEvent.click(twoButton)
        await fireEvent.click(oneButton)

        expect(display.textContent).toBe('21**')

        await fireEvent.click(enterButton)

        const combination = container.querySelector('div.combinationDisplayContainer > div:nth-child(1)')
        expect(combination.textContent).toBe('1 1 1 2')
    })

    it('should get the combinations correct for 12', async () => {
        const { container } = render(App)

        const display = container.querySelector('div.display')
        const oneButton = container.querySelector('div.keypad > div:nth-child(1) > button:nth-child(1)')
        const twoButton = container.querySelector('div.keypad > div:nth-child(1) > button:nth-child(2)')
        const enterButton = container.querySelector('div.keypad > div:nth-child(4) > button:nth-child(3)')

        await fireEvent.keyDown(document.body, { key: 'Escape' })

        expect(display.textContent).toBe('****')

        await fireEvent.click(oneButton)
        await fireEvent.click(twoButton)

        expect(display.textContent).toBe('12**')

        await fireEvent.click(enterButton)

        const combinations = container.querySelector('div.combinationDisplayContainer > div:nth-child(2)')
        const combination = container.querySelector('div.combinationDisplayContainer > div:nth-child(1)')
        const nextButton = container.querySelector('div.combinationDisplayContainer > div:nth-child(3) > button')

        expect(combination.textContent).toBe('1 1 1 2')
        expect(combinations.textContent).toBe('Attempt 1 of 14')

        await fireEvent.click(nextButton)
        expect(combination.textContent).toBe('1 1 2 1')
        expect(combinations.textContent).toBe('Attempt 2 of 14')

        await fireEvent.click(nextButton)

        expect(combination.textContent).toBe('1 1 2 2')
        expect(combinations.textContent).toBe('Attempt 3 of 14')

        await fireEvent.click(nextButton)

        expect(combination.textContent).toBe('1 2 1 1')
        expect(combinations.textContent).toBe('Attempt 4 of 14')

        await fireEvent.click(nextButton)

        expect(combination.textContent).toBe('1 2 1 2')
        expect(combinations.textContent).toBe('Attempt 5 of 14')

        await fireEvent.click(nextButton)

        expect(combination.textContent).toBe('1 2 2 1')
        expect(combinations.textContent).toBe('Attempt 6 of 14')

        await fireEvent.click(nextButton)

        expect(combination.textContent).toBe('1 2 2 2')
        expect(combinations.textContent).toBe('Attempt 7 of 14')

        await fireEvent.click(nextButton)

        expect(combination.textContent).toBe('2 1 1 1')
        expect(combinations.textContent).toBe('Attempt 8 of 14')

        await fireEvent.click(nextButton)

        expect(combination.textContent).toBe('2 1 1 2')
        expect(combinations.textContent).toBe('Attempt 9 of 14')

        await fireEvent.click(nextButton)

        expect(combination.textContent).toBe('2 1 2 1')
        expect(combinations.textContent).toBe('Attempt 10 of 14')

        await fireEvent.click(nextButton)

        expect(combination.textContent).toBe('2 1 2 2')
        expect(combinations.textContent).toBe('Attempt 11 of 14')

        await fireEvent.click(nextButton)

        expect(combination.textContent).toBe('2 2 1 1')
        expect(combinations.textContent).toBe('Attempt 12 of 14')

        await fireEvent.click(nextButton)

        expect(combination.textContent).toBe('2 2 1 2')
        expect(combinations.textContent).toBe('Attempt 13 of 14')

        await fireEvent.click(nextButton)

        expect(combination.textContent).toBe('2 2 2 1')
        expect(combinations.textContent).toBe('Attempt 14 of 14')
    })

    it('should display start again when reaching end of combinations', async () => {
        const { container } = render(App)

        const display = container.querySelector('div.display')
        const oneButton = container.querySelector('div.keypad > div:nth-child(1) > button:nth-child(1)')
        const twoButton = container.querySelector('div.keypad > div:nth-child(1) > button:nth-child(2)')
        const enterButton = container.querySelector('div.keypad > div:nth-child(4) > button:nth-child(3)')

        await fireEvent.keyDown(document.body, { key: 'Escape' })

        expect(display.textContent).toBe('****')

        await fireEvent.click(oneButton)
        await fireEvent.click(twoButton)

        expect(display.textContent).toBe('12**')

        await fireEvent.click(enterButton)

        const combinations = container.querySelector('div.combinationDisplayContainer > div:nth-child(2)')
        const combination = container.querySelector('div.combinationDisplayContainer > div:nth-child(1)')
        const nextButton = container.querySelector('div.combinationDisplayContainer > div:nth-child(3) > button')

        expect(combination.textContent).toBe('1 1 1 2')
        expect(combinations.textContent).toBe('Attempt 1 of 14')


        // Click next 13 times to get to the end of the combinations
        for (let i = 0; i < 13; i++) {
            await fireEvent.click(nextButton)
        }

        expect(combinations.textContent).toBe('Attempt 14 of 14')

        await fireEvent.click(nextButton)

        const endMessage = screen.getByText('End of combinations')
        const startAgainBtn = screen.getByText('Start again')
        expect(endMessage).toBeInTheDocument()
        expect(startAgainBtn).toBeInTheDocument()
    })

    it('should react to keyboard presses', async () => {
        const { container } = render(App)

        const display = container.querySelector('div.display')

        await fireEvent.keyDown(document.body, { key: 'Escape' })

        expect(display.textContent).toBe('****')

        await fireEvent.keyDown(document.body, { key: '1' })

        expect(display.textContent).toBe('1***')

        await fireEvent.keyDown(document.body, { key: 'Backspace' })

        expect(display.textContent).toBe('****')

        await fireEvent.keyDown(document.body, { key: '1' })

        expect(display.textContent).toBe('1***')

        await fireEvent.keyDown(document.body, { key: 'Delete' })

        expect(display.textContent).toBe('****')

        await fireEvent.keyDown(document.body, { key: '1' })
        await fireEvent.keyDown(document.body, { key: '2' })
        await fireEvent.keyDown(document.body, { key: '3' })
        await fireEvent.keyDown(document.body, { key: '4' })

        expect(display.textContent).toBe('1234')

        await fireEvent.keyDown(document.body, { key: 'Enter' })

        let combination = container.querySelector('div.combinationDisplayContainer > div:nth-child(1)')
        expect(combination.textContent).toBe('1 2 3 4')

        await fireEvent.keyDown(document.body, { key: 'Backspace' })
        expect(display.textContent).toBe('123*')

        await fireEvent.keyDown(document.body, { key: 'Return' })

        combination = container.querySelector('div.combinationDisplayContainer > div:nth-child(1)')
        expect(combination.textContent).toBe('1 1 2 3')

        await fireEvent.keyDown(document.body, { key: 'Escape' })

        expect(display.textContent).toBe('****')
    })

    it('should automatically start when opening with ?code=', async () => {
        const mockLocation = {
            search: '?code=123'
        };
        Object.defineProperty(global, 'location', {
            value: mockLocation
        });

        const { container } = render(App);

        const display = container.querySelector('.display');
        expect(display.textContent).toBe('123*');

        const combination = container.querySelector('.combinationDisplayContainer > div:nth-child(1)');
        expect(combination.textContent).toBe('1 1 2 3');
    });
})
