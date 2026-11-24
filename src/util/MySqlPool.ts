import mysql from "mysql2/promise";

type StrictPartial<T extends Record<string, any>, P extends keyof T> = {
	[Property in P]-?: T[P]
} & { [Prop in keyof T]?: T[Prop] }

type AdvancedMySqlPoolOptions = StrictPartial<
	mysql.PoolOptions,
	| "host"
	| "port"
	| "database"
	| "user"
	| "password"
	| "waitForConnections"
	| "connectionLimit"
	| "queueLimit"
	| "connectTimeout"
	| "enableKeepAlive"
	| "keepAliveInitialDelay"
	| "namedPlaceholders"
>;
type DefaultMySqlPoolOptions = Pick<mysql.PoolOptions, 'host' | 'port' | 'database' | 'user' | 'password'>;

let pool: mysql.Pool | null = null;

function createDefaultPool(options: DefaultMySqlPoolOptions): mysql.Pool {
	if (pool) return pool;

	pool = mysql.createPool({
		...options,
			waitForConnections: true,
			connectionLimit: 10,
			queueLimit: 0,
			connectTimeout: 10000,
			enableKeepAlive: true,
			keepAliveInitialDelay: 30000,
			namedPlaceholders: true
	});

    
}
