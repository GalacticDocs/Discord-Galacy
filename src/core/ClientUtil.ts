import { Collection, Attachment, Embed, Permissions, Snowflake, User } from 'discord.js';
import GalacyClient from './GalacyClient';

/** Client utilities to help with common tasks. */
export default class ClientUtil {
	/** @param client - The Galacy client. */
	constructor(private readonly client: GalacyClient) {
		this.client = client;
	}

	/**
		* Resolves a user from a string, such as an ID, a name, or a mention.
		* @param text - Text to resolve.
		* @param users - Collection of users to find in.
		* @param caseSensitive - Makes finding by name case sensitive.
		* @param wholeWord - Makes finding by name match full word only.
		*/
	public resolveUser(text: string, users: Collection<Snowflake, User>, caseSensitive: boolean = false, wholeWord: boolean = false): User | undefined {
		return users.get(text) || users.find((u) => this.checkUser(text, u, caseSensitive, wholeWord));
	}

    /**
     * Resolves multiple users from a string, such as an ID, a name, or a mention.
     * @param text - Text to resolve.
     * @param users - Collection of users to find in.
     * @param caseSensitive - Makes finding by name case sensitive.
     * @param wholeWord - Makes finding by name match full word only.
     */
    public resolveUsers(text: string, users: Collection<Snowflake, User>, caseSensitive: boolean = false, wholeWord: boolean = false): Collection<Snowflake, User> {
        return users.filter(user => this.checkUser(text, user, caseSensitive, wholeWord));
    }

	/**
		* Checks if a string could be referring to a user.
		* @param text - Text to check.
		* @param user - User to check.
		* @param caseSensitive - Makes checking by name case sensitive.
		* @param wholeWord - Makes checking by name match full word only.
		*/
	private checkUser(text: string, user: User, caseSensitive: boolean = false, wholeWord: boolean = false) {
		if (user.id === text) return true;

		const reg = /<@!?(\d{17,})>/;
		const match = text.match(reg);

		if (match && user.id === match[1]) return true;

		text = caseSensitive ? text : text.toLowerCase();
		const globalName = user.globalName || user.username;
		const username = caseSensitive ? user.displayName : globalName;
		const discrim = user.discriminator;

		if (!wholeWord) {
			return username.includes(text)
			|| (username.includes(text.split('#')[0]) && discrim.includes(text.split('#')[1]));
		}

			return username === text
			|| (username === text.split('#')[0] && discrim === text.split('#')[1]);
	}
}
