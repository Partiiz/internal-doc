import { Type } from "./Type";

export class Enum extends Type {
	/**
	 * @param {string} name
	 * @param {string} description
	 * @param {string[]} values
	 */
	constructor(name, description, values) {
		super(
			name,
			description + "\n\n" + `enum ${name} {\n\t${values.join(",\n\t").toUpperCase()}\n}`
		);
	}
}
