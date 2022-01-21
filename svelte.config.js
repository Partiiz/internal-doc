import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const PROD = process.env.NODE_ENV === 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		paths: {
			base: PROD ? '/partiiz_internal_doc' : ''
		},
		adapter: adapter(),
		target: 'body'
	}
};

export default config;
