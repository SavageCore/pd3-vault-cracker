import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/svelte';

import Component from './index.svelte';
import { writable } from 'svelte/store';

describe('Component', () => {
  let display: HTMLElement;
  let zeroButton: HTMLElement;
  let oneButton: HTMLElement;
  let twoButton: HTMLElement;
  let threeButton: HTMLElement;
  let fourButton: HTMLElement;
  let fiveButton: HTMLElement;
  let sixButton: HTMLElement;
  let sevenButton: HTMLElement;
  let eightButton: HTMLElement;
  let nineButton: HTMLElement;
  let enterButton: HTMLElement;
  let deleteButton: HTMLElement;
  let container: HTMLElement;

  beforeEach(() => {
    const result = render(Component);
    container = result.container;

    display = container.querySelector('div.display')!;
    oneButton = container.querySelector(
      'div.keypad > div:nth-child(1) > button:nth-child(1)',
    )!;
    twoButton = container.querySelector(
      'div.keypad > div:nth-child(1) > button:nth-child(2)',
    )!;
    threeButton = container.querySelector(
      'div.keypad > div:nth-child(1) > button:nth-child(3)',
    )!;
    fourButton = container.querySelector(
      'div.keypad > div:nth-child(2) > button:nth-child(1)',
    )!;
    fiveButton = container.querySelector(
      'div.keypad > div:nth-child(2) > button:nth-child(2)',
    )!;
    sixButton = container.querySelector(
      'div.keypad > div:nth-child(2) > button:nth-child(3)',
    )!;
    sevenButton = container.querySelector(
      'div.keypad > div:nth-child(3) > button:nth-child(1)',
    )!;
    eightButton = container.querySelector(
      'div.keypad > div:nth-child(3) > button:nth-child(2)',
    )!;
    nineButton = container.querySelector(
      'div.keypad > div:nth-child(3) > button:nth-child(3)',
    )!;
    enterButton = container.querySelector(
      'div.keypad > div:nth-child(4) > button:nth-child(3)',
    )!;
    zeroButton = container.querySelector(
      'div.keypad > div:nth-child(4) > button:nth-child(2)',
    )!;
    deleteButton = container.querySelector(
      'div.keypad > div:nth-child(4) > button:nth-child(1)',
    )!;
  });

  test('should render without crashing', () => {
    const { container } = render(Component);
    expect(container).toMatchSnapshot();
  });

  test('should render with props', () => {
    const { container } = render(Component, {
      props: {
        pressedNumbers: writable([1, 2, 3, 4]),
      },
    });
    expect(container).toMatchSnapshot();
  });

  it('should disallow duplicate number entry', async () => {
    await fireEvent.click(oneButton);

    expect(display.textContent).toBe('1***');

    await fireEvent.click(oneButton);
    expect(display.textContent).toBe('1***');

    await fireEvent.click(twoButton);
    expect(display.textContent).toBe('12**');
  });

  it('should disallow more than 4 .pressed buttons', async () => {
    await fireEvent.click(oneButton);
    expect(display.textContent).toBe('1***');

    await fireEvent.click(twoButton);
    expect(display.textContent).toBe('12**');

    await fireEvent.click(threeButton);
    expect(display.textContent).toBe('123*');

    await fireEvent.click(fourButton);
    expect(display.textContent).toBe('1234');

    await fireEvent.click(fiveButton);
    expect(display.textContent).toBe('1234');

    const pressedButtons = container.querySelectorAll('.pressed');
    expect(pressedButtons.length).toBe(4);
  });

  it('should give 14 combinations for 2 digit input', async () => {
    await fireEvent.keyDown(document.body, { key: 'Escape' });

    expect(display.textContent).toBe('****');

    await fireEvent.click(oneButton);
    await fireEvent.click(twoButton);

    expect(display.textContent).toBe('12**');

    await fireEvent.click(enterButton);

    const combinations = container.querySelector('p.attempts-display');

    if (!combinations) {
      throw new Error('Combinations not found');
    }

    expect(combinations.textContent).toBe('Attempt 1 of 14');
  });

  it('should give 36 combinations for 3 digit input', async () => {
    await fireEvent.keyDown(document.body, { key: 'Escape' });

    expect(display.textContent).toBe('****');

    await fireEvent.click(oneButton);
    await fireEvent.click(twoButton);
    await fireEvent.click(threeButton);

    expect(display.textContent).toBe('123*');

    await fireEvent.click(enterButton);

    const combinations = container.querySelector('p.attempts-display');

    if (!combinations) {
      throw new Error('Combinations not found');
    }

    expect(combinations.textContent).toBe('Attempt 1 of 36');
  });

  it('should give 24 combinations for 4 digit input', async () => {
    await fireEvent.keyDown(document.body, { key: 'Escape' });

    expect(display.textContent).toBe('****');

    await fireEvent.click(oneButton);
    await fireEvent.click(twoButton);
    await fireEvent.click(threeButton);
    await fireEvent.click(fourButton);

    expect(display.textContent).toBe('1234');

    await fireEvent.click(enterButton);

    const combinations = container.querySelector('p.attempts-display');

    if (!combinations) {
      throw new Error('Combinations not found');
    }

    expect(combinations.textContent).toBe('Attempt 1 of 24');
  });

  it('should delete a digit when ✘ button clicked', async () => {
    await fireEvent.keyDown(document.body, { key: 'Escape' });

    expect(display.textContent).toBe('****');

    await fireEvent.click(oneButton);
    await fireEvent.click(twoButton);

    expect(display.textContent).toBe('12**');

    await fireEvent.click(deleteButton);

    expect(display.textContent).toBe('1***');
  });

  it('should sort the combinations', async () => {
    await fireEvent.keyDown(document.body, { key: 'Escape' });

    expect(display.textContent).toBe('****');

    await fireEvent.click(twoButton);
    await fireEvent.click(oneButton);

    expect(display.textContent).toBe('21**');

    await fireEvent.click(enterButton);

    const combination = container.querySelector('div.display');

    if (!combination) {
      throw new Error('Combinations not found');
    }

    expect(combination.textContent).toBe('1112');
  });

  it('should get the combinations correct for 12', async () => {
    await fireEvent.keyDown(document.body, { key: 'Escape' });

    expect(display.textContent).toBe('****');

    await fireEvent.click(oneButton);
    await fireEvent.click(twoButton);

    expect(display.textContent).toBe('12**');

    await fireEvent.click(enterButton);

    const combinations = container.querySelector('p.attempts-display');

    if (!combinations) {
      throw new Error('Combinations not found');
    }

    const combination = container.querySelector('div.display');

    if (!combination) {
      throw new Error('Combination not found');
    }

    const nextButton = container.querySelector(
      'div.combinationDisplayContainer > a[role="button"]',
    );

    if (!nextButton) {
      throw new Error('Next button not found');
    }

    expect(combination.textContent).toBe('1112');
    expect(combinations.textContent).toBe('Attempt 1 of 14');

    await fireEvent.click(nextButton);
    expect(combination.textContent).toBe('1121');
    expect(combinations.textContent).toBe('Attempt 2 of 14');

    await fireEvent.click(nextButton);

    expect(combination.textContent).toBe('1122');
    expect(combinations.textContent).toBe('Attempt 3 of 14');

    await fireEvent.click(nextButton);

    expect(combination.textContent).toBe('1211');
    expect(combinations.textContent).toBe('Attempt 4 of 14');

    await fireEvent.click(nextButton);

    expect(combination.textContent).toBe('1212');
    expect(combinations.textContent).toBe('Attempt 5 of 14');

    await fireEvent.click(nextButton);

    expect(combination.textContent).toBe('1221');
    expect(combinations.textContent).toBe('Attempt 6 of 14');

    await fireEvent.click(nextButton);

    expect(combination.textContent).toBe('1222');
    expect(combinations.textContent).toBe('Attempt 7 of 14');

    await fireEvent.click(nextButton);

    expect(combination.textContent).toBe('2111');
    expect(combinations.textContent).toBe('Attempt 8 of 14');

    await fireEvent.click(nextButton);

    expect(combination.textContent).toBe('2112');
    expect(combinations.textContent).toBe('Attempt 9 of 14');

    await fireEvent.click(nextButton);

    expect(combination.textContent).toBe('2121');
    expect(combinations.textContent).toBe('Attempt 10 of 14');

    await fireEvent.click(nextButton);

    expect(combination.textContent).toBe('2122');
    expect(combinations.textContent).toBe('Attempt 11 of 14');

    await fireEvent.click(nextButton);

    expect(combination.textContent).toBe('2211');
    expect(combinations.textContent).toBe('Attempt 12 of 14');

    await fireEvent.click(nextButton);

    expect(combination.textContent).toBe('2212');
    expect(combinations.textContent).toBe('Attempt 13 of 14');

    await fireEvent.click(nextButton);

    expect(combination.textContent).toBe('2221');
    expect(combinations.textContent).toBe('Attempt 14 of 14');
  });

  it('should display start again when reaching end of combinations', async () => {
    await fireEvent.keyDown(document.body, { key: 'Escape' });

    expect(display.textContent).toBe('****');

    await fireEvent.click(oneButton);
    await fireEvent.click(twoButton);

    expect(display.textContent).toBe('12**');

    await fireEvent.click(enterButton);

    const combinations = container.querySelector('p.attempts-display');

    if (!combinations) {
      throw new Error('Combinations not found');
    }

    const combination = container.querySelector('div.display');

    if (!combination) {
      throw new Error('Combination not found');
    }

    const nextButton = container.querySelector(
      'div.combinationDisplayContainer > a[role="button"]',
    );

    if (!nextButton) {
      throw new Error('Next button not found');
    }

    expect(combination.textContent).toBe('1112');
    expect(combinations.textContent).toBe('Attempt 1 of 14');

    // Click next 13 times to get to the end of the combinations
    for (let i = 0; i < 13; i++) {
      await fireEvent.click(nextButton);
    }

    expect(combinations.textContent).toBe('Attempt 14 of 14');

    await fireEvent.click(nextButton);

    expect(screen.getByText('End of combinations')).toBeInTheDocument();
    expect(screen.getByText('Start again')).toBeInTheDocument();
  });

  it('should start when Enter is typed', async () => {
    await fireEvent.keyDown(document.body, { key: '1' });
    await fireEvent.keyDown(document.body, { key: '2' });
    expect(display.textContent).toBe('12**');

    await fireEvent.keyDown(document.body, { key: 'Enter' });

    expect(display.textContent).toBe('1112');
  });

  it('should start when Return is typed', async () => {
    await fireEvent.keyDown(document.body, { key: '1' });
    await fireEvent.keyDown(document.body, { key: '2' });
    expect(display.textContent).toBe('12**');

    await fireEvent.keyDown(document.body, { key: 'Return' });

    expect(display.textContent).toBe('1112');
  });

  it('should enter a digit when a number is typed', async () => {
    for (let i = 0; i < 10; i++) {
      await fireEvent.keyDown(document.body, { key: `${i}` });
      expect(display.textContent).toBe(`${i}***`);

      // Clear the display
      await fireEvent.keyDown(document.body, { key: `Escape` });
    }
  });

  it('should not enter a digit when a F key is typed', async () => {
    for (let i = 0; i < 10; i++) {
      await fireEvent.keyDown(document.body, { key: `F${i}` });
      expect(display.textContent).toBe(`****`);

      // Clear the display
      await fireEvent.keyDown(document.body, { key: `Escape` });
    }
  });

  it('should enter a digit when a number is left clicked', async () => {
    const buttons = [
      { number: '0', button: zeroButton },
      { number: '1', button: oneButton },
      { number: '2', button: twoButton },
      { number: '3', button: threeButton },
      { number: '4', button: fourButton },
      { number: '5', button: fiveButton },
      { number: '6', button: sixButton },
      { number: '7', button: sevenButton },
      { number: '8', button: eightButton },
      { number: '9', button: nineButton },
    ];

    for (const button of buttons) {
      await fireEvent.click(button.button);

      expect(display.textContent).toBe(`${button.number}***`);

      // Clear the display
      await fireEvent.keyDown(document.body, { key: `Escape` });
    }
  });

  it('should clear a number if right clicked', async () => {
    const buttons = [
      { number: '0', button: zeroButton },
      { number: '1', button: oneButton },
      { number: '2', button: twoButton },
      { number: '3', button: threeButton },
      { number: '4', button: fourButton },
      { number: '5', button: fiveButton },
      { number: '6', button: sixButton },
      { number: '7', button: sevenButton },
      { number: '8', button: eightButton },
      { number: '9', button: nineButton },
    ];

    for (const button of buttons) {
      await fireEvent.click(button.button);

      expect(display.textContent).toBe(`${button.number}***`);

      await fireEvent.contextMenu(button.button);
    }
  });

  it('should delete a digit when Backspace is typed', async () => {
    await fireEvent.keyDown(document.body, { key: '1' });
    expect(display.textContent).toBe('1***');

    await fireEvent.keyDown(document.body, { key: 'Backspace' });

    expect(display.textContent).toBe('****');
  });

  it('should delete a digit when Delete is typed', async () => {
    await fireEvent.keyDown(document.body, { key: '1' });
    expect(display.textContent).toBe('1***');

    await fireEvent.keyDown(document.body, { key: 'Delete' });

    expect(display.textContent).toBe('****');
  });

  it('should clear the display when Escape is typed', async () => {
    await fireEvent.keyDown(document.body, { key: '1' });
    expect(display.textContent).toBe('1***');

    await fireEvent.keyDown(document.body, { key: 'Escape' });

    expect(display.textContent).toBe('****');
  });

  it('should clear the display when X is right-clicked', async () => {
    await fireEvent.keyDown(document.body, { key: '1' });
    expect(display.textContent).toBe('1***');

    await fireEvent.contextMenu(deleteButton);

    expect(display.textContent).toBe('****');
  });

  // TODO: Fix this test
  // it('should start when code is provided', async () => {
  //   Object.defineProperty(window, 'location', {
  //     value: {
  //       search: '?code=123',
  //     },
  //     writable: true,
  //   });

  //   const { component } = render(Component);

  //   expect(component.start).toHaveBeenCalled();
  // });
});
