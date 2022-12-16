import { api } from "$lib/utils/api";

/**
 * @type {import("./$types").PageLoad}
 */
export async function load() {
	/**
	 * @type {User[]}
	 */
	const users = await api.get("/users");

	return { users };
}
