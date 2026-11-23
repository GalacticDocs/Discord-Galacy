import mysql from "mysql2/promise";

type Optional<T, P extends keyof T> = {
    [Property in keyof T]?: T[Property];
} & { [Property in P]-?: T[P]; };
type StrictExtract<T, P extends keyof T> = T extends Record<string, infer U> ? { [Property in P] } : never;

type MySqlPoolOptions = Optional<mysql.PoolOptions, "host" | "port" | "database" | "user" | "password">;
type DefaultMySqlPoolOptions = StrictExtract<MySqlPoolOptions, "host" | "port" | "database" | "user" | "password">;

let pool: mysql.Pool | null = null;
const defaultPoolOptions = (options: DefaultMySqlPoolOptions): mysql.PoolOptions => {
    return {
        host: options.
        waitForConnections: true,
        
    };
};

function createPool(): mysql.Pool {
    if (pool) return pool;

    pool = mysql.createPool({

    })
}