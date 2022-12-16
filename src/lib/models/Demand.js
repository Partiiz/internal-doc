import { Filter } from "./Filter";
import { Model } from "./classes/Model";
import { boolean } from "./types/boolean";
import { date } from "./types/date";
import { message_type } from "./types/message_type";
import { number } from "./types/number";
import { string } from "./types/string";
import { user_id } from "./types/user_id";
import { list } from "./types/list";

export class Demand extends Model {
	static "@name" = "Demand";
	static "@description" = "Une demande de soirée";

	author = user_id;
	tips = boolean;
	name = string;
	location = string;
	description = string;
	date = date;
	filters = list.of(Filter);
	maxParticipants = number;
	averageAge = string;

	"organizer?" = user_id.withDescription(
		"si cette propriété n'est pas présente, c'est que la demande est globale"
	);

	messages = list.of({
		author: user_id,
		createdAt: date,
		type: message_type,
		content: string
	});
}
