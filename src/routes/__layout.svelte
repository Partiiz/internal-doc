<script>
	import Nav from '$lib/components/Nav.svelte';

	let title = '';
</script>

<Nav bind:title />

<main>
	{#if title}
		<h1>{title}</h1>
	{/if}
	<slot />
</main>

<style global lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap');

	*,
	*::after,
	*::before {
		padding: 0;
		margin: 0;

		box-sizing: border-box;
		transition: none 400ms cubic-bezier(0, 0.25, 0.5, 1);
	}

	:root {
		font-family: 'Nunito', sans-serif;

		--primary: #31378b;
		--secondary: 218, 218, 230;

		color: var(--primary);
		background-color: rgb(var(--secondary));
	}

	body {
		display: grid;
		grid-template-columns: auto 1fr;
		height: 100vh;
	}

	main {
		overflow: auto;
		font-size: 1.25em;
		padding: 2em;

		font-weight: 300;

		ul,
		ol,
		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			margin-bottom: 1em;
		}

		p {
			line-height: 1.5em;
			letter-spacing: 0.035ch;
			text-align: justify;
			margin-bottom: 1.5em;
		}

		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			&:not(:first-child) {
				margin-top: 2.5em;
			}
		}

		h1 {
			font-weight: 900;
		}

		ul,
		ol {
			margin-left: 2em;
		}

		a {
			color: rgb(var(--secondary));
			background-color: var(--primary);
		}

		q {
			margin: 1em;
			margin-left: 0;

			display: block;
			padding: 0.5em 0.75em;
			width: max-content;

			font-size: 0.85em;
			font-style: italic;
			font-family: monospace;

			border-radius: 0.25em;
			background-color: rgb(200, 200, 218);

			b {
				font-weight: bold;
				text-transform: uppercase;

				&::before {
					content: '{';
				}
				&::after {
					content: '}';
				}
			}
		}
	}
</style>
