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
    override async init(): Bluebird<void> {
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
}