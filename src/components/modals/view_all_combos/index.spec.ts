import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/svelte';

import Component from './index.svelte';
import { writable } from 'svelte/store';

test('should render without crashing', () => {
  const { container } = render(Component);
  expect(container).toMatchSnapshot();
});

test('should render with props', () => {
  const { container } = render(Component, {
    props: {
      isOpen: false,
      onClose: () => {},
      onClear: () => {},
      combinations: [
        [6, 6, 6, 9],
        [6, 6, 9, 6],
        [6, 6, 9, 9],
        [6, 9, 6, 6],
        [6, 9, 6, 9],
        [6, 9, 9, 6],
        [6, 9, 9, 9],
        [9, 6, 6, 6],
        [9, 6, 6, 9],
        [9, 6, 9, 6],
        [9, 6, 9, 9],
        [9, 9, 6, 6],
        [9, 9, 6, 9],
        [9, 9, 9, 6],
      ],
      combination: writable([]),
    },
  });
  expect(container).toMatchSnapshot();
});

test('should print known fingerprints in header', () => {
  const pressedNumbers = writable([]);
  pressedNumbers.set([6, 9] as never[]);

  let knownFingerprints;

  pressedNumbers.subscribe((value) => {
    knownFingerprints = value.join('');
  });

  const { container } = render(Component, {
    props: {
      combination: pressedNumbers,
    },
  });

  // Expect All combinations for x
  expect(container).toHaveTextContent(
    `All combinations for ${knownFingerprints}`,
  );
});

test('should print a button for each combination', () => {
  const combinations = [
    [6, 6, 6, 9],
    [6, 6, 9, 6],
    [6, 6, 9, 9],
    [6, 9, 6, 6],
    [6, 9, 6, 9],
    [6, 9, 9, 6],
    [6, 9, 9, 9],
    [9, 6, 6, 6],
    [9, 6, 6, 9],
    [9, 6, 9, 6],
    [9, 6, 9, 9],
    [9, 9, 6, 6],
    [9, 9, 6, 9],
    [9, 9, 9, 6],
  ];

  const { container } = render(Component, {
    props: {
      combinations,
    },
  });

  // Expect 14 buttons
  expect(container.querySelectorAll('.combo .combo-btn')).toHaveLength(14);

  // Expect each button to have the correct text
  const buttons = container.querySelectorAll('.combo .combo-btn');
  for (const [index, button] of buttons.entries()) {
    expect(button).toHaveTextContent(`${[combinations][0][index].join('')}`);
  }
});

test('should clear all .tried and .correct buttons when clear button is pressed', async () => {
  const combinations = [
    [6, 6, 6, 9],
    [6, 6, 9, 6],
    [6, 6, 9, 9],
    [6, 9, 6, 6],
    [6, 9, 6, 9],
    [6, 9, 9, 6],
    [6, 9, 9, 9],
    [9, 6, 6, 6],
    [9, 6, 6, 9],
    [9, 6, 9, 6],
    [9, 6, 9, 9],
    [9, 9, 6, 6],
    [9, 9, 6, 9],
    [9, 9, 9, 6],
  ];

  const { container } = render(Component, {
    props: {
      combinations,
      combination: writable([6, 9]),
      onClear: () => {
        const buttons = document.querySelectorAll('.combo .combo-btn');
        for (const button of buttons) {
          button.classList.remove('tried');
          button.classList.remove('correct');
        }
      },
    },
  });

  const comboButtons = container.querySelectorAll('.combo .combo-btn');
  const clearButton = container.querySelector('.clear-btn')!;

  // Set all buttons to .tried
  for (const button of comboButtons) {
    await fireEvent.click(button);
    expect(button).toHaveClass('tried');
  }

  // Click clear button
  await fireEvent.click(clearButton);

  // Expect all buttons to not have .tried
  for (const button of comboButtons) {
    expect(button).not.toHaveClass('tried');
  }

  // Set a button to .correct
  await fireEvent.contextMenu(comboButtons[0]);
  expect(comboButtons[0]).toHaveClass('correct');

  // Click clear button
  await fireEvent.click(clearButton);

  // Expect all buttons to not have .correct
  for (const button of comboButtons) {
    expect(button).not.toHaveClass('tried');
    expect(button).not.toHaveClass('correct');
  }
});
