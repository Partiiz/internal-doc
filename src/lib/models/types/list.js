import { List } from "../classes/List";

export const list = {
	/**
	 * @param {import("../classes/List").ListType} type
	 */
	of(type) {
		return new List(type);
	}
};
