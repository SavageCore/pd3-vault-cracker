import Header from './index.svelte';
import { render } from '@testing-library/svelte'

describe('Header', () => {
    it('renders header', () => {
        const { container } = render(Header)

        expect(container).toMatchSnapshot()
    });
});
