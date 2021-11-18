import { writable } from "svelte/store";

export const page = writable({
  current: null,
});
