import { Enum } from "../classes/Enum";

export const message_type = new Enum("MessageType", "Le type du contenu d'un message", [
	"TEXT",
	"IMAGE",
	"VIDEO",
	"AUDIO"
]);
