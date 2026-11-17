import Provider, { ProviderOptions } from "./Provider";
import { Model, ModelStatic } from "sequelize";

/** Provider using the `sequelize` library. */
export default class SequelizeProvider extends Provider {
    /** Sequelize model. */
    private table: ModelStatic<Model<string, Object>>;
    
    /** Column for ID. */
    private idColumn: string;
    
    /** Column for JSON data. */
    private dataColumn?: string;
    
    /**
     * @param table - A Sequelize table.
     * @param option - Options to use.
     */
    constructor(table: ModelStatic<Model<string, Object>>, options: ProviderOptions = {}) {
        super();

        this.table = table;
        this.idColumn = options.idColumn || 'id';
        this.dataColumn = options.dataColumn;
    }

    /** Initializes the provider */
    override async init(): Promise<void> {
        const rows = await this.table.findAll();
        for (const row of rows) {
            // @ts-ignore
            this.items.set(row[this.idColumn], this.dataColumn ? row[this.dataColumn] : row);
        }
    }

    /**
     * Gets a value.
     * @param id - ID of entry.
     * @param key - The key to get.
     * @param defaultValue - Default value if not found or null.
     */
    override get<T>(id: string, key: string, defaultValue: T): T {
        if (this.items.has(id)) {
            // @ts-expect-error
            const value = this.items.get(id)[key];
            return value == null ? defaultValue : value;
        }

        return defaultValue;
    }

    override set(id: string, key: string, value: any): Promise<[Model<string, Object>, boolean | null]> {
        const data = this.items.get(id) || {};
        // @ts-ignore - Object indexing in TypeScript is hard to tweak.
        data[key] = value;
        this.items.set(id, data);
        
        if (this.dataColumn) {
            return this.table.upsert({
                [this.idColumn]: id,
                [this.dataColumn]: data
            });
        }

        return this.table.upsert({
            [this.idColumn]: id,
            [key]: value
        });
    }

    /**
     * Deletes a value.
     * @param id - ID of entry.
     * @param key - The key to delete.
     */
    override delete(id: string, key: string) {
        const data = this.items.get(id) || {};
        // @ts-ignore - Object indexing in TypeScript is hard to tweak.
        delete data[key];

        if (this.dataColumn) {
            return this.table.upsert({
                [this.idColumn]: id,
                [this.dataColumn]: data
            });
        }

        return this.table.upsert({
            [this.idColumn]: id,
            [key]: null
        });
    }

    /**
     * Clears an entry.
     * @param id - ID of entry.
     */
    override clear(id: string): Promise<void> {
        this.items.delete(id);
        // @ts-ignore - Indexing in sequelize in TypeScript is hard to succeed.
        return this.table.destroy({ where: { [this.idColumn]: id } });
    }
}