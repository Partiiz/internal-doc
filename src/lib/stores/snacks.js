import { browser } from '$app/env';
import { getMessage } from '$lib/lang';
import { writable } from 'svelte/store';

const makeSnacks = () => {
	const { subscribe, update } = writable([]);

	let uuid = 0;
	let interval;

	const push = (message) => {
		const snack = { _id: uuid++, message: getMessage(message) };
		if (!browser) return;

		update((snacks) => [snack, ...snacks]);

		if (interval) return;

		interval = setInterval(() => {
			update((snacks) => {
				const v = snacks.slice(0, -1);

				if (!v.length) {
					clearInterval(interval);
					interval = null;
					uuid = 0;
				}

				return v;
			});
		}, 3500);
	};

	const remove = (snack) => update((snacks) => snacks.filter((s) => s !== snack));

	return {
		subscribe,
		remove,
		push
	};
};

export const snacks = makeSnacks();
