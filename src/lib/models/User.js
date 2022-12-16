import { Filter } from "./Filter";
import { Model } from "./classes/Model";
import { any } from "./types/any";
import { boolean } from "./types/boolean";
import { date } from "./types/date";
import { message_type } from "./types/message_type";
import { object_id } from "./types/object_id";
import { string } from "./types/string";
import { user_id } from "./types/user_id";
import { user_status } from "./types/user_status";
import { list } from "./types/list";

export class User extends Model {
	static "@name" = "User";
	static "@description" = "Un Utilisateur";

	avatar = string.withDescription("Le nom du fichier");
	profiles = [string];
	status = user_status;

	nickName = string;
	firstName = string;
	lastName = string;
	email = string;
	phone = string;
	birthDate = date;
	location = string;
	"bio?" = string;

	filters = list.of(Filter);

	"certified?" = {
		"@description": "Si l'utilisateur est certifié, cette propriété sera présente",
		cardId: string.withDescription("Le chemin vers la photo de la carte d'identité"),
		verified: boolean,
		createdAt: date
	};

	"wallet?" = any.withDescription("System de paiement\n\n@question à quoi ça ressemble ?");

	"organizerDescription?" = string.withDescription(
		"Si cette propriété est présente, c'est que l'utilisateur est ouvert aux demandes\nCette option est disponible que si la personne est certifiée"
	);

	friends = list.of(user_id);

	conversations = list.of({
		_id: object_id,

		members: list.of({
			user: user_id,
			owner: boolean
		}),

		messages: list.of({
			_id: string,
			createdAt: date,
			author: user_id,
			type: message_type,
			content: any,
			likes: list.of(user_id)
		}),

		upToDates: {
			"User['_id']": object_id.withDescription("L'identifiant d'un message d'une conversation")
		}
	});
}
