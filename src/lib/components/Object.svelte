<script>
	import { Model, Type } from '$lib/models';

	/** @type {Model | Type | object | Array<any>} */
	export let data;
	export let key = null;
	export let description = null;
</script>

{#if key}
	{#if !key.startsWith('@')}
		<div class="property">
			<span
				on:mouseenter={data['@description']
					? () => (description = data['@description'])
					: undefined}
				on:mouseleave={data['@description'] ? () => (description = null) : undefined}
			>
				{@html key.replace(/\?$/, `<i style="font-weight: 900">$&</i>`)}
			</span>
			<svelte:self bind:description {data} />
		</div>
	{/if}
{:else if data instanceof Type}
	{data['@name']}
{:else if data.constructor === Object}
	&lbrace;
	<div class="properties">
		{#each Object.entries(data) as [key, value]}
			<svelte:self bind:description data={value} {key} />
		{/each}
	</div>
	&rbrace;
{:else if data.constructor === Array}
	&lbrack;
	<div
		style="margin-left: 1em;"
		on:mouseenter={() =>
			(description = `Une liste de ${data[0]['@name'] || '??'}\n\n-> ${
				data[0]['@description'] || 'pas de description...'
			}`)}
		on:mouseleave={() => (description = null)}
	>
		<svelte:self bind:description data={data[0]} />
	</div>
	&rbrack;
{:else if data instanceof Model}
	{#each Object.entries(data) as [key, data]}
		<svelte:self bind:description {data} {key} />
	{/each}
{:else}
	{data}
{/if}

<style lang="scss">
	.property {
		background-color: var(--primary);
		color: rgb(var(--secondary));

		padding: 0.25em;
		padding-right: 0.75em;
		border-radius: 0.25em;

		span:first-child {
			display: inline-block;
			padding: 0.25em 0.5em;
			margin-right: 0.25em;
			border-radius: 0.25em;
			background-color: rgba(var(--secondary), 0.15);
			transition-property: opacity;

			&:hover {
				opacity: 0.5;
			}
		}
	}

	.properties {
		padding: inherit;
		padding-left: 1em;
	}
</style>
