<script context="module"></script>

<script>
	import { page } from "$app/stores";

	import Nav from "$lib/components/Nav.svelte";

	/**
	 * @type {import("./$types").LayoutData}
	 */
	export let data;

	/**
	 * @param {typeof data} nav
	 * @param {string} uri
	 */
	const find = (nav, uri) => {
		const match = /^\/doc\/([^/]+)\/([^#]+)/.exec(uri);

		if (!match) return {};

		const [, folder, file] = match;

		if (!nav[folder] || !nav[folder].endpoints.includes(file)) return {};

		return { folder, file };
	};

	$: ({ folder, file } = find(data, decodeURI($page.url.pathname)));

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
			element?.scrollIntoView({ behavior: "smooth", block: "start" });
		};

		update(hash);

		return { update };
	};

	$: document.title = `${folder} - ${file}`;
</script>

<div>
	<Nav nav={data} />

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
