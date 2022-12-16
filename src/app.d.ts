// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Error {
		id: string;
		status?: number;
		stack?: string;
	}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}

interface ImportMetaEnv {
	readonly VITE_MONGO_DB_URI: string;
	readonly VITE_MONGO_DB_NAME: string;
	readonly VITE_JWT_KEY: string;
}
