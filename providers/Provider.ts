import GalacyError from "../util/GalacyError";
import { Collection } from "discord.js";

/**
 * A provider for the key-value storage.
 * Must be implemented.
 */
export default class Provider {
    /** Cached entries. */
    public items: Collection<string, Object>;
    
    constructor() {
        this.items = new Collection();
    }

    /** 
     * Initializes the provider.
     * @abstract
     */
    public init(): any {
        throw new GalacyError("NOT_IMPLEMENTED", this.constructor.name, 'init');
    }

    /**
     * Gets a value.
     * @abstract
     * @param id - ID of the entry.
     * @param key - The key to get.
     * @param defaultValue - Defaul value if not found or null.
     */
    public get<T>(id: string, key: string, defaultValue: T): T {
        throw new GalacyError("NOT_IMPLEMENTED", this.constructor.name, 'get');
    }

    /**
     * Sets a value.
     * @abstract
     * @param id - ID of entry.
     * @param key - The key to set.
     * @param value - The value.
     */
    public set<T>(id: string, key: string, value: T): T {
        throw new GalacyError("NOT_IMPLEMENTED", this.constructor.name, 'set');
    }

    /**
     * Deletes a value.
     * @abstract
     * @param id - ID of entry.
     * @param key - The key to delete.
     */
    public delete(id: string, key: string): any {
        throw new GalacyError("NOT_IMPLEMENTED", this.constructor.name, 'delete');
    }

    /**
     * Clears an entry
     * @abstract
     * @param id - ID of entry.
     */
    public clear(id: string): any {
        throw new GalacyError("NOT_IMPLEMENTED", this.constructor.name, 'clear');
    }
}

/** Options to use for providers. */
export type ProviderOptions = {
    /** Column for the unique key, defaults to 'id'. */
    idColumn?: string;
    /**
     * Column for JSON data.
     * If not provided, the provider will use all columns of the table.
     * If provided, only one column will be used, but it will be more flexible due to being parsed as JSON.
     * For Sequelize, note that the model has to specify the type of the column as JSON or JSONB.
     */
    dataColumn?: string;
};