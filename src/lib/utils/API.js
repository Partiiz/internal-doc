import { browser } from '$app/env';
import { snacks } from '$lib/stores/snacks';

const { VITE_API } = import.meta.env;

/**
 * @param {string} endpoint
 * @param {RequestInit=} init
 */
const request = async (endpoint, init = {}, jwt = undefined) => {
	const url = `${VITE_API}/${endpoint.replace(/^\/+/, '')}`;

	if (browser && !jwt) jwt = document.cookie.match(/jwt=([^;]*);?/)?.[1];

	try {
		const { result, error } = await fetch(url, {
			method: init.method,
			headers: {
				Authorization: `Bearer ${jwt}`,
				'Content-Type': 'application/json',
				...(init.headers || {})
			},
			body: JSON.stringify(init.body)
		}).then((res) => res.json());

		if (error) throw error;

		return result;
	} catch (error) {
		snacks.push(error.id);
		throw error;
	}
};

export class API {
	static get(endpoint, jwt) {
		return request(endpoint, { method: 'GET' }, jwt);
	}

	static post(endpoint, body, jwt) {
		return request(endpoint, { method: 'POST', body }, jwt);
	}

	static patch(endpoint, body, jwt) {
		return request(endpoint, { method: 'PATCH', body }, jwt);
	}

	static put(endpoint, body, jwt) {
		return request(endpoint, { method: 'PUT', body }, jwt);
	}

	static delete(endpoint, body, jwt) {
		return request(endpoint, { method: 'DELETE', body }, jwt);
	}
}
