<script>
	import { page } from "$app/stores";
</script>

<main>
	<h1>Oopsie... 🥸</h1>
	{#if $page.error?.status !== undefined}
		{#if $page.error.status === 404}
			<p>Ce quer vous recherchez n'a pas été trouvé... 😢</p>
			<a href="/doc">Revenir sur la doc</a>
		{:else if $page.error.status >= 500}
			<p>On dirait qu'il y a eu une erreur interne 🤔</p>
		{/if}
	{:else}
		<p>
			{$page.error?.message}
		</p>
	{/if}
	{#if import.meta.env.DEV}
		<pre>{JSON.stringify($page.error?.stack, null, 2)}</pre>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 15vw;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
