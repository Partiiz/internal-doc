<script>
	import { goto } from "$app/navigation";
	import { base } from "$app/paths";
	import { page } from "$app/stores";
	import { user } from "$lib/stores/user";
	import { slide } from "svelte/transition";

	import Icon from "./Icon.svelte";

	/**
	 * @type {NavEndpoints}
	 */
	export let nav;

	$: uri = decodeURI($page.url.pathname);
	$: admin = $user.profiles.includes("admin");

	const gotoAdmin = () => {
		if (!admin) return;
		goto("/admin");
	};
</script>

<nav>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<svg class="logo" class:admin on:click={gotoAdmin} viewBox="0 0 76 84" fill="none">
		<g filter="url(#filter0_d_36_8)">
			<path
				d="M23.2967 59.432C21.2807 59.432 19.6727 58.856 18.4727 57.704C17.3207 56.504 16.7447 54.896 16.7447 52.88V14.36C16.7447 12.392 17.2727 10.88 18.3287 9.824C19.3847 8.768 20.8967 8.24 22.8647 8.24H41.2967C46.9127 8.24 51.2807 9.68 54.4007 12.56C57.5207 15.392 59.0807 19.352 59.0807 24.44C59.0807 29.48 57.4967 33.44 54.3287 36.32C51.2087 39.2 46.8647 40.64 41.2967 40.64H29.9927V52.88C29.9927 54.896 29.3927 56.504 28.1927 57.704C26.9927 58.856 25.3607 59.432 23.2967 59.432ZM39.4967 30.704C41.9447 30.704 43.7447 30.2 44.8967 29.192C46.0967 28.184 46.6967 26.624 46.6967 24.512C46.6967 20.336 44.2967 18.248 39.4967 18.248H29.9927V30.704H39.4967Z"
				fill="#DADAE6"
			/>
		</g>
		<defs>
			<filter
				id="filter0_d_36_8"
				x="0.74472"
				y="0.23999"
				width="74.336"
				height="83.192"
				filterUnits="userSpaceOnUse"
				color-interpolation-filters="sRGB"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dy="8" />
				<feGaussianBlur stdDeviation="8" />
				<feColorMatrix
					type="matrix"
					values="0 0 0 0 0.196078 0 0 0 0 0.219608 0 0 0 0 0.545098 0 0 0 1 0"
				/>
				<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_36_8" />
				<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_36_8" result="shape" />
			</filter>
		</defs>
	</svg>

	{#each Object.keys(nav) as label}
		{@const f = nav[label]}
		<div class="folder" class:open={f.open}>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<p on:click={() => (nav[label].open = !nav[label].open)}>
				{label}
				<Icon name="chevron-down" />
			</p>
			{#if f.open}
				<ul transition:slide>
					{#each f.endpoints as endpoint}
						{@const href = `${base}/doc/${label}/${endpoint}`}
						{@const current = uri === href}
						<li>
							<a class="file" class:current {href}>
								{endpoint}
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/each}
</nav>

<style lang="scss">
	.logo {
		width: 5em;
		height: 5em;
		margin: 0.65em 0;

		&.admin {
			cursor: pointer;
			transition-property: transform;

			&:hover {
				transform: scale(1.1);
			}
		}
	}

	nav {
		width: 20em;
		height: 100%;
		overflow: auto;

		background-color: var(--primary);
		color: rgb(var(--secondary));
		padding-bottom: 10em;
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
