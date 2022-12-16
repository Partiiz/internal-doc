import { user } from "$lib/stores/user";
import { redirect } from "@sveltejs/kit";
import { get } from "svelte/store";

/**
 * @type {import('./$types').PageLoad}
 */
export async function load() {
	if (!get(user).profiles.includes("anonymous")) {
		throw redirect(302, "/doc");
	}
}
