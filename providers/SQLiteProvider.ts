import Provider, { ProviderOptions } from "./Provider";
import { Database, Statement } from "sqlite";

/** Provider using the `sqlite` library. */
export default class SQLiteProvider extends Provider {
    /** SQLite database. */
    private db: Database | Promise<Database>;

    /** Name of the table. */
    private readonly tableName: string;

    /** Column for ID. */
    private readonly idColumn: string;

    /** Column for JSON data. */
    private readonly dataColumn?: string;

    /**
     * @param db - SQLite database from `sqlite`.
     * @param tableName - Name of table to handle.
     * @param options - Options to use.
     */
    constructor(db: Database | Promise<Database>, tableName: string, options: ProviderOptions) {
        super();

        this.db = db;
        this.tableName = tableName;
        this.idColumn = options.idColumn || 'id';
        this.dataColumn = options.dataColumn;
    }

    /** Initializes the provider. */
    public async init(): Promise<void> {
        const db = await this.db;
        this.db = db;

        const rows = await this.db.all(`SELECT * FROM ${this.tableName}`);
        for (const row of rows) {
            this.items.set(row[this.idColumn], this.dataColumn ? JSON.parse(row[this.dataColumn]) : row);
        }
    }

    /**
     * Gets a value.
     * @param id - ID of entry.
     * @param key - The key to get.
     * @param defaultValue - Default value if not found or null.
     */
    public get<T>(id: string, key: string, defaultValue: T): T {
        if (this.items.has(id)) {
            // @ts-expect-error - Indexing collections in TypeScript is hard to tweak.
            const value = this.items.get(id)[key];
            return value == null ? defaultValue : value;
        }

        return defaultValue;
    }

    /**
     * Sets a value.
     * @param id - ID of entry.
     * @param key - The key to set.
     * @param value - The value.
     */
    public set<T>(id: string, key: string, value: T): Promise<Statement> {
        const data = this.items.get(id) || {};
        const exists = this.items.has(id);

        data[key] = value;
        this.items.set(id, data);

        if (this.dataColumn) {
            return this.db.run(exists
                ? `UPDATE ${this.tableName} SET ${this.dataColumn} = $value WHERE ${this.idColumn} = $id`
                : `INSERT INTO ${this.tableName} (${this.idColumn}, ${this.dataColumn}) VALUES ($id, $value)`, {

            });
        }
    }


    public delete(id: string, key: string) {
        super.delete(id, key);
    }


    public clear(id: string) {
        super.clear(id);
    }
}