/**
 * @type {import("./$types").LayoutLoad}
 */
export async function load() {
	/**
	 * @type {NavEndpoints}
	 */
	const nav = {};
	const paths = import.meta.glob("/src/routes/doc/**/*.svelte");

	for (const path in paths) {
		const [_, folder, page] = /doc\/([^/]+)\/([^/]+)\/\+[^.]+\.svelte$/g.exec(path) || [];
		if (!folder || !page) continue;

		nav[folder] = nav[folder] || { endpoints: [] };
		nav[folder].endpoints.push(page);
	}

	return nav;
}
