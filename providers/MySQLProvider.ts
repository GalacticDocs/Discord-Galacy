import Provider, { ProviderOptions } from "./Provider";

/** Provider using the `mysql2/promise` library. */
export default class MySqlProvider extends Provider {
    /** MySql table. */
    private table: string;

    /** Column for ID. */
    private readonly idColumn: string;

    /** Column for JSON data. */
    private readonly dataColumn?: string;

    /**
     * @param table - A mysql table. 
     * @param options - Options to use.
     */
    constructor(table: string, options: ProviderOptions = {}) {
        super();

        this.table = table;
        this.idColumn = options.idColumn || "id";
        this.dataColumn = options.dataColumn;
    }

    override async init(): Promise<void> {}
}