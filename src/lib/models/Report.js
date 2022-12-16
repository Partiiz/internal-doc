import { Model } from "./classes/Model";
import { any } from "./types/any";
import { report_type } from "./types/report_type";
import { string } from "./types/string";
import { user_id } from "./types/user_id";

export class Report extends Model {
	static "@name" = "Report";
	static "@description" =
		"Un signalement fait via l'application, ce sera visible par les administrateurs";

	author = user_id;
	subject = string;
	details = string;

	type = report_type;

	document = any;

	members = [user_id];
}
