import { Model } from "./classes/Model";
import { number } from "./types/number";

export class Verify extends Model {
	static "@name" = "Verify";
	static "@description" = "Vérification du numéro de téléphone de l'utilisateur";

	phone = number;
	keyCode = number;
}
