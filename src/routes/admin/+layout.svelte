<script>
	import { user } from "$lib/stores/user";
</script>

<svelte:head>
	<title>Partiiz DOC - Admin</title>
</svelte:head>

{#if $user.profiles.includes("admin")}
	<main>
		<h1>Bonjour {$user.username} 😎</h1>
		<a href="/doc">Retourner sur la DOC</a>
		<slot />
	</main>
{/if}
