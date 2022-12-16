import { Enum } from "../classes/Enum";

export const partiiz_role = new Enum("PartiizRole", "Le rôle d'un utilisateur dans une Partiiz", [
	"MEMBER",
	"MODERATOR",
	"ORGANIZER",
	"OWNER"
]);
