<script context="module">
	/**
	 * @type {import("@sveltejs/kit").Load}
	 */
	export async function load() {
		const paths = await import.meta.glob('/src/routes/doc/**/*.svelte');
		const nav = {};

		for (const path in paths) {
			const [_, folder, file] = /doc\/([^/]+)\/([^.]+)\.svelte$/g.exec(path) || [];
			if (!folder || !file) continue;

			nav[folder] = nav[folder] || { endpoints: [] };
			nav[folder].endpoints.push(file);
		}

		return { props: { nav } };
	}
</script>

<script>
	import { page } from '$app/stores';

	import Nav from '$lib/components/Nav.svelte';

	export let nav;

	const find = (nav, uri) => {
		const match = /^\/doc\/([^/]+)\/([^#]+)/.exec(uri);

		if (!match) return;

		const [, folder, file] = match;

		if (!nav[folder] || !nav[folder].endpoints.includes(file)) return;

		return { folder, file };
	};

	$: uri = decodeURI($page.url.pathname);
	$: ({ folder, file } = find(nav, uri) || {});

	/**
	 * @param {HTMLElement} node
	 * @param {string} hash
	 */
	const scrollToHash = (node, hash) => {
		/**
		 * @param {typeof hash} h
		 */
		const update = (h) => {
			if (!h) return;
			const element = node.querySelector(h);
			element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		};

		update(hash);

		return { update };
	};
</script>

<svelte:head>
	{#if folder && file}
		<title>
			{folder} - {file}
		</title>
	{/if}
</svelte:head>

<div>
	<Nav {nav} />

	<main use:scrollToHash={$page.url.hash}>
		{#if file}
			<h1>{file}</h1>
		{/if}
		<slot />
	</main>
</div>

<style lang="scss">
	div {
		display: grid;
		grid-template-columns: auto 1fr;
		height: 100vh;
	}

	main {
		padding-bottom: 50vh;
	}
</style>
