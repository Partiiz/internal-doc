<script>
	import { models } from '$lib/models';
	import { scale } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import { spring } from 'svelte/motion';
	import Object from '$lib/components/Object.svelte';

	const mouse = spring({ x: 0, y: 0 }, {});

	let description = null;
</script>

<svelte:window
	on:mousemove={(e) => {
		mouse.set({ x: e.clientX, y: e.clientY });
	}}
/>

{#if description}
	<div
		in:scale={{ easing: expoOut }}
		class="description"
		style="--x: {$mouse.x}px; --y: {$mouse.y}px"
	>
		{description}
	</div>
{/if}

<p>Les "<i style="font-weight: 900;">?</i>" sont là pour dire que la propriété est optionnelle</p>

<div class="models">
	{#each models as model}
		<div class="model">
			<h1>{model.name}</h1>
			<p>{model.description}</p>
			<Object data={new model()} bind:description />
		</div>
	{/each}
</div>

<style lang="scss">
	.models {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2em;
	}

	.model {
		background-color: white;
		padding: 1em;
		border-radius: 0.5em;
		height: max-content;
		display: grid;
		gap: 0.5em;

		p,
		h1 {
			margin-bottom: 0;
		}

		& > p {
			margin-bottom: 1em;
		}
	}

	.description {
		z-index: 10;
		background-color: var(--primary);
		color: rgb(var(--secondary));

		padding: 1em 1.5em;
		border-radius: 1em;
		border-bottom-left-radius: 0.5em;

		position: absolute;
		top: var(--y);
		left: var(--x);

		white-space: pre-wrap;

		transform: translateY(calc(-100% - 1em));
		margin: 1em;
		transform-origin: bottom left;
	}
</style>
