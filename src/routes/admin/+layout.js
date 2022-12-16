import { user } from "$lib/stores/user";
import { redirect } from "@sveltejs/kit";
import { get } from "svelte/store";

/**
 * @type {import("./$types").LayoutLoad}
 */
export async function load() {
	if (!get(user).profiles.includes("admin")) {
		throw redirect(302, "/doc");
	}
}
