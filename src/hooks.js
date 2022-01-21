/**
 * @type {import("@sveltejs/kit").Handle}
 */
export const handle = async ({ resolve, event }) =>
	resolve(event, {
		ssr: false
	});
