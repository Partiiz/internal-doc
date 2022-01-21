<script context="module">
	export async function load({ error, status }) {
		return {
			props: { error, status }
		};
	}
</script>

<script>
	/** @type {Error} */
	export let error;

	/** @type {number} */
	export let status;
</script>

<h1>Oopsie... 🥸</h1>
{#if status === 404}
	<p>Cette page n'existe pas... 😢</p>
{:else if status >= 500}
	<p>On dirait qu'il y a eu une erreur interne 🤔</p>
{:else}
	<p>
		{error.message}
	</p>
{/if}
