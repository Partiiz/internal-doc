<p>Double clique pour mettre l'image en plein écran</p>
<img
	on:dblclick={(e) => {
		e.currentTarget.requestFullscreen();
	}}
	src="/architecture.png"
	alt="Architecture Partiiz"
/>

<style lang="scss">
	img {
		border-radius: 0.5em;
		width: 50%;
	}
</style>
