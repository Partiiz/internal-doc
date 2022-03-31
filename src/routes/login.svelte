<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ session }) {
		if (!session.user.profiles.includes('anonymous')) return { redirect: '/', status: 302 };

		return {};
	}
</script>

<script>
	import { goto } from '$app/navigation';

	import { session } from '$app/stores';

	import { API } from '$lib/utils/API';

	let username = '';
	let password = '';

	let submitting = false;

	const login = async () => {
		submitting = true;
		try {
			const jwt = await API.post('/users/login', {
				username,
				password
			});

			document.cookie = `jwt=${jwt}; path=/`;

			const user = await API.get('/users/me');

			$session = { jwt, user };
			await goto('/doc');
		} finally {
			submitting = false;
		}
	};
</script>

<main>
	<h1>Hummm,<br />identifiez-vous<br />🕵️</h1>
	<form on:submit|preventDefault={login}>
		<input
			type="text"
			bind:value={username}
			autocomplete="username"
			placeholder="Nom d'utilisateur"
			disabled={submitting}
		/>
		<input
			type="password"
			bind:value={password}
			autocomplete="current-password"
			placeholder="Mot de passe"
			disabled={submitting}
		/>
		<button type="submit" disabled={submitting}>S'identifier</button>
	</form>
</main>

<style lang="scss">
	form {
		display: grid;
		gap: 0.5em;
	}

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		text-align: center;
	}
</style>
