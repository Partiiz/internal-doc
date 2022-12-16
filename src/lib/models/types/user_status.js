import { Enum } from "../classes/Enum";

export const user_status = new Enum("UserStatus", "Le statut d'un utilisateur", [
	"BANNED",
	"ACTIVE",
	"ARCHIVED"
]);
