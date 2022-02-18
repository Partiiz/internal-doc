<script context="module">
	import { API } from '$lib/utils/API';

	/**
	 * @type {import("@sveltejs/kit").Load}
	 */
	export async function load({ session }) {
		const users = await API.get('/users', session.jwt);

		return {
			props: {
				users
			}
		};
	}
</script>

<script>
	import User from '$lib/components/User.svelte';
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { snacks } from '$lib/stores/snacks';

	export let users = [];

	let username = '';
	let password = '';
	let disabled = false;

	const register = async () => {
		disabled = true;
		try {
			const res = await API.post('/users', {
				username,
				password
			});

			const user = { _id: res.insertedId, profiles: ['user'], username };
			users = users.concat(user);

			snacks.push('success.user.created');
			username = '';
			password = '';
		} finally {
			disabled = false;
		}
	};
</script>

<h2>Voici une liste de tout les utilisateurs</h2>
<ul>
	<li>
		<form on:submit|preventDefault={register}>
			<input
				{disabled}
				type="text"
				bind:value={username}
				autocomplete="username"
				placeholder="Son nom d'utilisateur"
			/>
			<input
				{disabled}
				type="password"
				bind:value={password}
				autocomplete="new-password"
				placeholder="Son mot de passe"
			/>
			<button {disabled} type="submit">Créer 💂‍♀️</button>
		</form>
	</li>
	{#each users as user (user._id)}
		<li in:scale|local animate:flip>
			<User
				bind:user
				on:delete={() => {
					users = users.filter((u) => u !== user);
				}}
			/>
		</li>
	{/each}
</ul>

<style lang="scss">
	form {
		background-color: var(--primary);
		padding: 1em;
		height: 100%;
		border-radius: 1em;
		display: grid;
		gap: 0.5em;

		button {
			border: 1px solid rgb(var(--secondary));
		}
	}

	ul {
		margin: 0;
		list-style: none;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
		gap: 2em;
	}

	li {
		margin: 0;
	}
</style>
