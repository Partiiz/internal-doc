import { Model } from "./classes/Model";
import { admin_level } from "./types/admin_level";
import { string } from "./types/string";

export class Admin extends Model {
	static "@name" = "Admin";
	static "@description" = "Un administrateur";

	level = admin_level;

	password = string;
	name = string;
}
