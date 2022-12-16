import { Filter } from "./Filter";
import { Model } from "./classes/Model";
import { any } from "./types/any";
import { boolean } from "./types/boolean";
import { date } from "./types/date";
import { message_type } from "./types/message_type";
import { number } from "./types/number";
import { partiiz_role } from "./types/partiiz_role";
import { string } from "./types/string";
import { user_id } from "./types/user_id";
import { list } from "./types/list";

export class Partiiz extends Model {
	static "@name" = "Partiiz";
	static "@description" = "Une Partiiz";

	name = string;

	covers = list.of(string.withDescription("Le chemin vers l'image de couverture"));
	date = date;
	location = string;
	description = string;

	filters = list.of(Filter);

	maxParticipants = number;
	ageAverage = string.withDescription(
		'@question est-ce que ce champ possède un format strict ? Ou c\'est juste du texte ?\n\n@example "17-22"'
	);

	members = list.of({
		user: user_id.withDescription("La référence d'un utilisateur"),
		role: partiiz_role,
		wasPresent: boolean
	});

	"whoBringsWhat?" = list.of({
		"@description": "Si la fonctionnalité n'est pas activé la propriété ne doit pas exister",
		name: string,
		photo: string,
		bringers: {
			"User['_id']": number
		}
	});

	tipsEnabled = boolean;

	organizerRights = {
		"@description": "C'est pour savoir si l'organisateur à le droit d'inviter",
		invite: boolean
	};

	displayOrganizerPhone = boolean;

	"sponsorized?" = number.withDescription(
		"Si la fonctionnalité n'est pas activé la propriété ne doit pas exister"
	);

	storiiz = list.of({
		author: user_id,
		source: string,
		createdAt: date
	});

	messages = list.of({
		_id: string,
		author: user_id,
		createdAt: date,
		archived: boolean,
		type: message_type,
		content: any,
		likes: user_id
	});

	upToDates = {
		"User['_id']": boolean.withDescription(
			"true pour dire que l'utilisateur est à jour sur la conversation de cette partiiz"
		)
	};

	ratings = list.of({
		"@description": "Les évaluations peuvent être créées par les participants de la partiiz",
		author: user_id,
		rating: number.withDescription("0 | 1 | 2 | 3 | 4 | 5"),
		comment: string
	});

	demands = list.of({
		user: user_id
	});
}
