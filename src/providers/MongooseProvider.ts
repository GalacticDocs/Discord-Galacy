import Provider from "./Provider";
import {model, Model} from 'mongoose';
import {Model} from 'sequelize';

/** Provider using the `Mongoose` library. */
export default class MongooseProvider extends Provider {
    /** Mongoose model */
    private model: Model<unknown>;

    /** @param model - A Mongoose model. */
    constructor(model: Model<unknown>) {
        super();

        this.model = model;
    }

    /** Initializes the provider. */
    public async init(): Promise<void> {
        const guilds = await this.model.find();
        for (const i in guilds) {
            const guild = guilds[i];
            this.items.set(guild.id, guild.settings);
        }
    }

    /**
     * Gets a value.
     * @param id - The ID of the guild.
     * @param key - The key to get.
     * @param defaultValue - Default value if not found or null.
     */
    public get<T>(id: string, key: string, defaultValue: T): T {
        if (this.items.has(id)) {
            // @ts-ignore - Object indexing in TypeScript is hard to tweak.
            const value = this.items.get(id)[key];
            return value == null ? defaultValue : value;
        }

        return defaultValue;
    }

    public async set<T>(id: string, key: string, value: T): Promise<any> {
        const data = this.items.get(id) || {};
        // @ts-ignore - Object indexing in TypeScript is hard to tweak.
        data[key] = value;
        this.items.set(id, data);

        const doc = await this.getDocument(id);
        doc.settings[key] = value;
        doc.markModified('settings');
        return doc.save();
    }

    /**
     * Deletes a value.
     * @param id - The ID of the guild.
     * @param key - The key to delete.
     */
    public async delete(id: string, key: string): Promise<any> {
        const data = this.items.get(id) || {};
        // @ts-ignore - Object indexing in TypeScript is hard to tweak.
        delete data[key];

        const doc = await this.getDocument(id);
        delete doc.settings[key];
        doc.markModified('settings');
        return doc.save();
    }

    /**
     * Removes a document.
     * @param id - The ID of the guild.
     */
    public async clear(id: string): Promise<void> {
        this.items.delete(id);
        const doc = await this.getDocument(id);
        if (doc) await doc.remove();
    }

    /**
     * Gets a document by guildID.
     * @param id - The ID of the guild.
     * @private
     */
    private async getDocument(id: string): Promise<any> {
        const obj = await this.model.findOne({ id });
        if (!obj) {
            // eslint-disable-next-line new-cap
            const newDoc = await new this.model({ id, settings: {} }).save();
            return newDoc;
        }

        return obj;
    }
}
