import Footer from './index.svelte';
import { render } from '@testing-library/svelte'

describe('Footer', () => {
    it('renders footer', () => {
        const { container } = render(Footer)

        expect(container).toMatchSnapshot()
    });
});
