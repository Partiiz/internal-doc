<script>
	import Snacks from "$lib/components/Snacks.svelte";
	import "$lib/locale";
	import "../app.scss";
</script>

<svelte:head>
	<title>Partiiz Doc</title>
</svelte:head>

<slot />
<Snacks />
