import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';

import Component from './index.svelte';

test('should render without crashing', () => {
  const { container } = render(Component);
  expect(container).toMatchSnapshot();
});

test('should render with props', () => {
  const { container } = render(Component, {
    props: {
      isOpen: false,
      onClose: () => {},
    },
  });
  expect(container).toMatchSnapshot();
});
