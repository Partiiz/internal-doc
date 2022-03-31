<script>
	import { createEventDispatcher } from 'svelte';
	import { snacks } from '$lib/stores/snacks';
	import { API } from '$lib/utils/API';
	import Icon from './Icon.svelte';

	export let user;

	const dispatch = createEventDispatcher();

	let timeout;
	let disabled = false;
	let password = '';

	const update = async (payload, msg) => {
		timeout = undefined;
		disabled = true;
		try {
			await API.patch(`/users/${user._id}`, payload);
			snacks.push('success.user.updated');
		} finally {
			disabled = false;
		}
	};

	const updateUsername = () => update({ username: user.username });

	const delay = () => {
		clearTimeout(timeout);
		timeout = setTimeout(updateUsername, 1500);
	};

	const blur = () => {
		if (!timeout) return;
		clearTimeout(timeout);
		updateUsername();
	};

	const deleteUser = async () => {
		disabled = true;
		try {
			await API.delete(`/users/${user._id}`);
			snacks.push('success.user.deleted');
			dispatch('delete');
		} finally {
			disabled = false;
		}
	};
</script>

<article class:disabled>
	<ul>
		{#each user.profiles as profile}
			<li>{profile}</li>
		{/each}
	</ul>
	<p bind:textContent={user.username} on:input={delay} on:blur={blur} contenteditable />
	<input
		type="password"
		placeholder="Modifier le mot de passe"
		bind:value={password}
		on:keydown={(e) => e.key === 'Enter' && update({ password }).then(() => (password = ''))}
	/>
	{#if !user.profiles.includes('admin')}
		<Icon name="ban" on:click={deleteUser} />
	{/if}
</article>

<style lang="scss">
	p {
		font-weight: 900;
		font-size: 2em;

		outline: none;
		border-radius: 0.25em;

		transition-property: padding;

		&:focus {
			background-color: rgb(var(--secondary));
			color: var(--primary);
			padding: 0.15em 0.35em;
		}
	}

	article {
		position: relative;
		background-color: var(--primary);
		color: rgb(var(--secondary));
		border-radius: 1em;
		padding: 1em;

		transition-property: opacity, transform;

		&.disabled {
			pointer-events: none;
			opacity: 0.5;
			transform: scale(0.95);
		}

		& > :global(svg) {
			cursor: pointer;
			position: absolute;
			top: 0;
			right: 0;
			transform: translate(35%, -35%) scale(var(--scale, 1));
			width: 2em;
			padding: 0.25em;
			border-radius: 50%;
			background-color: inherit;

			transition-property: transform;

			&:hover {
				--scale: 1.1;
			}
		}
	}

	ul {
		display: flex;
		gap: 0.5em;
		font-size: 0.75em;
		font-weight: 900;
		list-style: none;
		margin-bottom: 1em;
	}

	li {
		gap: 0.5em;
		background-color: rgb(var(--secondary));
		color: var(--primary);
		padding: 0.1em 0.75em;
		border-radius: 0.5em;
	}

	* {
		margin: 0;
	}

	input {
		margin-top: 0.5em;
	}
</style>
