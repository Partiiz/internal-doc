export class Type {
	constructor(name, description) {
		this['@name'] = name;
		this['@description'] = description;
	}

	withDescription(description) {
		return new Type(this['@name'], description);
	}
}

class Enum extends Type {
	/**
	 * @param {string} name
	 * @param {string} description
	 * @param {string[]} values
	 */
	constructor(name, description, values) {
		super(
			name,
			description + '\n\n' + `enum ${name} {\n\t${values.join(',\n\t').toUpperCase()}\n}`
		);
	}
}

const types = {
	object_id: new Type('ObjectId', "L'identifiant mongodb du model"),
	string: new Type('String', 'Une chaîne de caractères'),
	number: new Type('Number', 'Un nombre'),
	boolean: new Type('Boolean', 'Un booléen'),
	any: new Type('Object', 'Un objet quelconque'),
	user_id: new Type('User["_id"]', "L'identifiant mongodb d'un utilisateur"),
	date: new Type('Date', 'Un objet date'),
	admin_level: new Enum('AdminLevel', "Le niveau d'administration", ['normal', 'manager']),
	report_type: new Enum('ReportType', 'Le type de signalement', ['partiiz', 'storiiz', 'user']),
	message_type: new Enum('MessageType', "Le type du contenu d'un message", [
		'TEXT',
		'IMAGE',
		'VIDEO',
		'AUDIO'
	]),
	user_status: new Enum('UserStatus', "Le statut d'un utilisateur", [
		'BANNED',
		'ACTIVE',
		'ARCHIVED'
	]),
	partiiz_role: new Enum('PartiizRole', "Le rôle d'un utilisateur dans une Partiiz", [
		'MEMBER',
		'MODERATOR',
		'ORGANIZER',
		'OWNER'
	])
};

types.filter = {
	'@name': 'Filter',
	'@description': "Le filtre de recherche, c'est une préférence utilisateur",
	icon: types.string,
	name: types.string
};

export class Model {
	_id = types.object_id;

	static description = 'Un model';
}

/**
 * @type {typeof Model[]}
 */
export const models = [
	class User extends Model {
		avatar = types.string.withDescription('Le nom du fichier');
		profiles = [types.string];
		status = types.user_status;

		nickName = types.string;
		firstName = types.string;
		lastName = types.string;
		email = types.string;
		phone = types.string;
		birthDate = types.date;
		location = types.string;
		'bio?' = types.string;

		filters = [types.filter];

		'certified?' = {
			'@description': "Si l'utilisateur est certifié, cette propriété sera présente",
			cardId: types.string.withDescription("Le chemin vers la photo de la carte d'identité"),
			verified: types.boolean,
			createdAt: types.date
		};

		'wallet?' = types.any.withDescription('System de paiement\n\n@question à quoi ça ressemble ?');

		'organizerDescription?' = types.string.withDescription(
			"Si cette propriété est présente, c'est que l'utilisateur est ouvert aux demandes\nCette option est disponible que si la personne est certifiée"
		);

		friends = [types.user_id];

		conversations = [
			{
				_id: types.object_id,

				members: [
					{
						user: types.user_id,
						owner: types.boolean
					}
				],

				messages: [
					{
						_id: types.string,
						createdAt: types.date,
						author: types.user_id,
						type: types.message_type,
						content: types.any,
						likes: [types.user_id]
					}
				],

				upToDates: {
					"User['_id']": types.boolean.withDescription(
						"true si l'utilisateur est à jour sur cette conversation"
					)
				}
			}
		];
	},

	class Partiiz extends Model {
		name = types.string;

		covers = [types.string.withDescription("Le chemin vers l'image de couverture")];
		date = types.date;
		location = types.string;
		description = types.string;

		filters = [types.filter];

		maxParticipants = types.number;
		ageAverage = types.string.withDescription(
			'@question est-ce que ce champ possède un format strict ? Ou c\'est juste du texte ?\n\n@example "17-22"'
		);

		members = [
			{
				user: types.user_id.withDescription("La référence d'un utilisateur"),
				role: types.partiiz_role,
				wasPresent: types.boolean
			}
		];

		'whoBringsWhat?' = [
			{
				'@description': "Si la fonctionnalité n'est pas activé la propriété ne doit pas exister",
				name: types.string,
				photo: types.string,
				bringers: {
					"User['_id']": types.number
				}
			}
		];

		tipsEnabled = types.boolean;

		organizerRights = {
			'@description': "C'est pour savoir si l'organisateur à le droit d'inviter",
			invite: types.boolean
		};

		displayOrganizerPhone = types.boolean;

		'sponsorized?' = types.number.withDescription(
			"Si la fonctionnalité n'est pas activé la propriété ne doit pas exister"
		);

		storiiz = [
			{
				author: types.user_id,
				source: types.string,
				createdAt: types.date
			}
		];

		messages = [
			{
				_id: types.string,
				author: types.user_id,
				createdAt: types.date,
				archived: types.boolean,
				type: types.message_type,
				content: types.any,
				likes: types.user_id
			}
		];

		upToDates = {
			"User['_id']": types.boolean.withDescription(
				"true pour dire que l'utilisateur est à jour sur la conversation de cette partiiz"
			)
		};

		ratings = [
			{
				'@description': 'Les évaluations peuvent être créées par les participants de la partiiz',
				author: types.user_id,
				rating: types.number.withDescription('0 | 1 | 2 | 3 | 4 | 5'),
				comment: types.string
			}
		];

		demands = [
			{
				user: types.user_id
			}
		];
	},

	class Demand extends Model {
		static description = 'Une demande de soirée';

		author = types.user_id;
		tips = types.boolean;
		name = types.string;
		location = types.string;
		description = types.string;
		date = types.date;
		filters = [types.filter];
		maxParticipants = types.number;
		averageAge = types.string;

		'organizer?' = types.user_id.withDescription(
			"si cette propriété n'est pas présente, c'est que la demande est globale"
		);

		messages = [
			{
				author: types.user_id,
				createdAt: types.date,
				type: types.message_type,
				content: types.string
			}
		];
	},

	class Report extends Model {
		static description =
			"Un signalement fait via l'application, ce sera visible par les administrateurs";

		author = types.user_id;
		subject = types.string;
		details = types.string;

		type = types.report_type;

		document = types.any;

		members = [types.user_id];
	},

	class Admin extends Model {
		static description = 'Un administrateur';

		level = types.admin_level;

		password = types.string;
		name = types.string;
	}
];
