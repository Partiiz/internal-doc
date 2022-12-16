import { fr } from "./fr";
import i18 from "i18next";
import { writable } from "svelte/store";

i18.init({
	lng: navigator.language,
	debug: import.meta.env.DEV,
	resources: { fr }
});

/**
 * @param {string} ns
 */
export const useLocale = (ns) => {
	const { subscribe, set } = writable(i18.getFixedT(i18.language, ns));

	i18.on("languageChanged", () => {
		set(i18.getFixedT(i18.language, ns));
	});

	return { subscribe };
};
