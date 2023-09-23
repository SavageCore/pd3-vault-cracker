import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/svelte';

import App from './App.svelte';

test('should render without crashing', () => {
  const { container } = render(App);
  expect(container).toMatchSnapshot();
});

test('shows proper heading when rendered', () => {
  render(App);
  const heading = screen.getByText('#OFFLINEMODE');
  expect(heading).toBeInTheDocument();
});
