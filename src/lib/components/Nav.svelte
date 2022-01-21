<script>
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';

	import Icon from './Icon.svelte';

	export let title;

	const nav = [
		{
			base: 'home',
			label: 'Accueil',
			links: {
				main: 'Page Principal'
			}
		},
		{
			base: 'parties',
			label: 'Soirées',
			links: {
				card: 'Carte',
				create: 'Création de soirée'
			}
		},
		{
			base: 'generic',
			label: 'Générique',
			links: {
				filters: 'Liste des Filtres',
				reports: 'Critères de Signalements',
				payments: 'Systemes de Paiements'
			}
		}
	];

	$: folder = nav.find((f) => f.base === $page.url.pathname.split('/')[1]);
	$: title = folder?.links?.[$page.url.pathname.split('/')[2]];
</script>

<svelte:head>
	{#if folder}
		<title>{folder.label} - {title}</title>
	{:else}
		<title>Partiiz Doc</title>
	{/if}
</svelte:head>

<nav>
	{#each nav as folder}
		<div class="folder" class:open={folder.open}>
			<p on:click={() => (folder.open = !folder.open)}>
				{folder.label}
				<Icon name="chevron-down" />
			</p>
			{#if folder.open}
				<ul transition:slide>
					{#each Object.keys(folder.links) as href}
						{@const path = `${base}/${folder.base}/${href}`}
						<li>
							<a class="file" class:current={$page.url.pathname === path} href={path}>
								{folder.links[href]}
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/each}
</nav>

<style lang="scss">
	nav {
		width: 20em;
		height: 100%;

		background-color: var(--primary);
		color: rgb(var(--secondary));
	}

	ul {
		list-style: none;
	}

	.folder {
		cursor: pointer;
		user-select: none;
		margin-top: 0.5em;

		padding: 1em;
		padding-right: 1.5em;
		padding-bottom: 0;
		text-transform: uppercase;
		font-weight: 800;

		p {
			display: flex;
			gap: 2.5em;
			align-items: center;
			justify-content: space-between;

			:global(svg) {
				width: 2em;
				height: 2em;
				padding: 0.25em;
				border-radius: 35%;
				transform: rotate(var(--rotate));
				transition-property: background-color, transform;
			}
		}

		&.open {
			p {
				:global(svg) {
					--rotate: -180deg;

					background-color: rgba(var(--secondary), 0.15);
				}
			}
		}
	}

	.file {
		display: block;
		margin-top: 0.25em;
		padding: 0.5em 1em;
		font-weight: 400;
		border-radius: 0.5em;
		text-transform: none;
		color: inherit;
		text-decoration: none;

		transition-property: background-color, transform;

		&:hover {
			background-color: rgba(var(--secondary), 0.1);
		}

		&:active {
			background-color: rgb(var(--secondary));
			color: var(--primary);
			transform: scale(0.95);
		}

		&.current {
			background-color: rgb(var(--secondary));
			color: var(--primary);
		}
	}
</style>
