import { Model } from "../classes/Model";
import { Type } from "./Type";

/**
 * @typedef {Partial<Type | typeof Model> & Record<string, any>} ListType
 */
export class List extends Type {
	type;
	/**
	 * @param {ListType} type
	 */
	constructor(type) {
		super(`Liste de "${type["@name"] || "any"}"`, type["@description"] || "Pas de description...");

		// @ts-ignore
		this.type = type.prototype instanceof Model ? new type() : type;
	}
}
