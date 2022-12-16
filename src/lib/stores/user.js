import { api } from "$lib/utils/api";
import { writable } from "svelte/store";

function init() {
	const { set, update, subscribe } = writable(
		/** @type {User} */ ({
			_id: "-1",
			profiles: ["anonymous"]
		})
	);

	async function refresh() {
		const user = await api.get("/sessions/me");
		set(user);
		return user;
	}

	/**
	 * @param {string} username
	 * @param {string} password
	 */
	async function login(username, password) {
		const jwt = await api.post("/sessions", {
			username,
			password
		});

		localStorage.setItem("jwt", jwt);

		await refresh();
	}

	return {
		subscribe,
		refresh,
		login
	};
}

export const user = init();
