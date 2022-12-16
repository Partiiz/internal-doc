import { Model } from "./classes/Model";
import { string } from "./types/string";

export class Filter extends Model {
	static "@name" = "Filter";
	static "@description" = "Le filtre de recherche, c'est une préférence utilisateur";

	icon = string;
	name = string;
}
