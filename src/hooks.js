import { API } from '$lib/utils/API';

const { PROD } = import.meta.env;

/**
 * @type {import("@sveltejs/kit").GetSession}
 */
export const getSession = async ({ request }) => {
	const cookie = request.headers.get('cookie') || '';
	const match = /jwt=([^;]*);?/g.exec(cookie);
	const jwt = match?.[1];

	const user = PROD
		? await API.get('/users/me', jwt)
		: {
				_id: '1',
				profiles: ['admin']
		  };

	return { jwt, user };
};
