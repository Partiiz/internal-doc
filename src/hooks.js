import { API } from '$lib/utils/API';

/**
 * @type {import("@sveltejs/kit").GetSession}
 */
export const getSession = async ({ request }) => {
	const cookie = request.headers.get('cookie') || '';
	const match = /jwt=([^;]*);?/g.exec(cookie);
	const jwt = match?.[1];

	const user = await API.get('/users/me', jwt);

	return { jwt, user };
};
