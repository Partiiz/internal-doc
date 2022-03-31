<script context="module">
	import { session } from '$app/stores';

	/**
	 * @type {import("@sveltejs/kit").Load}
	 */
	export async function load({ session }) {
		if (!session.user.profiles.includes('admin'))
			return {
				redirect: '/doc',
				status: 302
			};

		return {};
	}
</script>

<svelte:head>
	<title>Partiiz DOC - Admin</title>
</svelte:head>

<main>
	<h1>Bonjour {$session.user.username} 😎</h1>
	<a href="/doc">Retourner sur la DOC</a>
	<slot />
</main>
