<script>
	import User from "$lib/components/User.svelte";
	import { scale } from "svelte/transition";
	import { flip } from "svelte/animate";
	import { snacks } from "$lib/stores/snacks";
	import { api } from "$lib/utils/api";
	import i18next from "i18next";

	/**
	 * @type {import("./$types").PageData}
	 */
	export let data;

	let username = "";
	let password = "";
	let disabled = false;

	const register = async () => {
		disabled = true;
		try {
			const res = await api.post("/users", {
				username,
				password
			});

			const user = { _id: res.insertedId, profiles: ["user"], username };
			data.users = data.users.concat(user);

			snacks.success("user.created");
			username = "";
			password = "";
		} catch (err) {
			// @ts-ignore
			snacks.error(err.id || err.message);
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
	{#each data.users as user (user._id)}
		<li in:scale|local animate:flip>
			<User
				bind:user
				on:delete={() => {
					data.users = data.users.filter((u) => u !== user);
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
