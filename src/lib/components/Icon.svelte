<script context="module">
	const icons = {
		'chevron-down': {
			viewBox: '0 0 24 24',
			fill: 'none',
			stroke: 'currentColor',
			content: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />`
		}
	};
</script>

<script>
	/**
	 * @type {keyof typeof icons}
	 */
	export let name;

	$: ({ content, ...props } = icons[name]);
</script>

<svg {...props} {...$$restProps} on:click>
	{@html content}
</svg>
