export class Type {
	/**
	 * @param {string} name
	 * @param {string} description
	 */
	constructor(name, description) {
		this["@name"] = name;
		this["@description"] = description;
	}

	/**
	 * @param {string} description
	 */
	withDescription(description) {
		return new Type(this["@name"], description);
	}
}
