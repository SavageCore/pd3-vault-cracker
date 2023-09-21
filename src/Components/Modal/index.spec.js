import Modal from './index.svelte';
import { render } from '@testing-library/svelte'

describe('Modal', () => {
    it('renders the modal', () => {
        const { container } = render(Modal)

        expect(container).toMatchSnapshot()
    });

    it('should be display none', () => {
        const { container } = render(Modal)

        const dialog = container.querySelector('dialog')

        expect(dialog.style.display).toBe('')
    });
});
