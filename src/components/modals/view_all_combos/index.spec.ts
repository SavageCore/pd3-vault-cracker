import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';

import Component from './index.svelte';
import { writable } from 'svelte/store';

test('should render without crashing', () => {
  const { container } = render(Component);
  expect(container).toMatchSnapshot();
});

test('should render with props', () => {
  const { container } = render(Component, {
    props: {
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
  expect(container.querySelectorAll('button')).toHaveLength(14);

  // Expect each button to have the correct text
  const buttons = container.querySelectorAll('button');
  for (const [index, button] of buttons.entries()) {
    expect(button).toHaveTextContent(`${[combinations][0][index].join('')}`);
  }
});
