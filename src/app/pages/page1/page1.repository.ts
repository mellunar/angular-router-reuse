import { createStore, withProps } from '@ngneat/elf';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Page1Props {
}

export const store = createStore({ name: 'page1' }, withProps<Page1Props>({}));

