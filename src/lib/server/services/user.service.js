import { crypter } from "$lib/utils/crypter";
import { error } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { db } from "../db.server";

class UserService {
	#collection;

	/**
	 * @param {import("mongodb").Collection<import("mongodb").Document & {
	 *  profiles: string[];
	 *  username: string;
	 *  password: string;
	 * }>} collection
	 */
	constructor(collection) {
		this.#collection = collection;
	}

	getAll() {
		return this.#collection.find().toArray();
	}

	/**
	 * @param {string?} jwtString
	 */
	async getFromJWT(jwtString) {
		try {
			if (typeof jwtString !== "string") {
				throw new Error("Invalid JWT");
			}

			const decoded = jwt.verify(jwtString, import.meta.env.VITE_JWT_SECRET);

			if (typeof decoded !== "string") {
				throw new Error("Invalid JWT");
			}

			return await this.#collection.findOne({
				_id: new ObjectId(decoded)
			});
		} catch (error) {
			return {
				_id: "-1",
				profiles: ["anonymous"]
			};
		}
	}

	/**
	 * @param {string} username
	 * @param {string} password
	 * @param {string[]} profiles
	 */
	async create(username, password, profiles) {
		return await this.#collection.insertOne({
			username,
			password: await crypter.hash(password),
			profiles
		});
	}

	/**
	 * @param {string} username
	 * @param {string} password
	 */
	async login(username, password) {
		const user = await this.#collection.findOne({
			username
		});

		if (!user) {
			throw error(404, { id: "user.not_found", message: "User not found" });
		}

		if (!(await crypter.verify(password, user.password))) {
			throw error(400, { id: "user.invalid_password", message: "Invalid password" });
		}

		return jwt.sign(user._id.toString(), import.meta.env.VITE_JWT_SECRET);
	}

	/**
	 * @param {string} _id
	 * @param {*} body
	 */
	async update(_id, body) {
		if (body.password) {
			body.password = await crypter.hash(body.password);
		}

		if (body.username) {
			const alreadyUsed = await this.#collection.findOne({
				username: body.username
			});

			if (alreadyUsed) {
				throw error(409, { id: "user.name_taken", message: "Username already taken" });
			}
		}

		return this.#collection.updateOne({ _id: new ObjectId(_id) }, { $set: body });
	}

	/**
	 * @param {string} _id
	 */
	delete(_id) {
		return this.#collection.deleteOne({ _id: new ObjectId(_id) });
	}
}

export const userService = new UserService(db.collection("users"));
