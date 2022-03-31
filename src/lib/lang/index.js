import fr from './fr.json';

const langs = { fr };

/**
 * @param {string} path
 * @param {keyof typeof langs} lang
 */
export const getMessage = (path, lang = 'fr') =>
	path.split('.').reduce((o, key) => o?.[key], langs[lang]) || path;
