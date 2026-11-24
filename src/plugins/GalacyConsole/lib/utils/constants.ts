import type { ConsoleOptions } from "../GalacyConsole";

export type ConsoleDefaults = Partial<ConsoleOptions>;
export type ConsoleTypes = {
    log: string;
    verbose: string;
    debug: string;
    warn: string;
    wtf: string;
    error: string;
};