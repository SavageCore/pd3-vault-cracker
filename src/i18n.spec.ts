import { render, screen } from '@testing-library/svelte';
import { locale, waitLocale } from 'svelte-i18n';

import Header from './components/header/index.svelte';

describe('i18n', () => {
  afterEach(async () => {
    locale.set('en');
    await waitLocale();
  });

  it('renders Dutch strings when the locale is nl', async () => {
    locale.set('nl');
    await waitLocale('nl');

    render(Header);

    expect(screen.getByTitle('Bron bekijken')).toBeInTheDocument();
    expect(screen.getByTitle('Hulp')).toBeInTheDocument();
  });

  it('renders English strings when the locale is en', async () => {
    locale.set('en');
    await waitLocale();

    render(Header);

    expect(screen.getByTitle('View source')).toBeInTheDocument();
    expect(screen.getByTitle('Help')).toBeInTheDocument();
  });
});
