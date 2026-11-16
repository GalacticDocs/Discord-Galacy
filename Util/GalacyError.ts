const ErrorMessages: { [key: string]: unknown } = {
    // Module-related
    FILE_NOT_FOUND: (filename: string) => `File '${filename}' not found`,
    MODULE_NOT_FOUND: (constructor: string, id: string) => `${constructor} '${id}' does not exist`,
    ALREADY_LOADED: (constructor: string, id: string) => `${constructor} '${id}' is already loaded`,
    NOT_RELOADABLE: (constructor: string, id: string) => `${constructor} '${id}' is not reloadable`,
    INVALID_CLASS_TO_HANDLE: (given: string, expected: string) => `Class to handle ${given} is not a subclass of ${expected}`,

    // Command-related
    ALIAS_CONFLICT: (alias: string, id: string, conflict: string) => `Alias '${alias}' of '${id}' already exist on '${conflict}'`,

    // Option-related
    COMMAND_UTIL_EXPLICIT: 'The command handler options `handleEdits` and `storeMessages` require the `commandUtil` option to be true',
    UNKNOWN_MATCH_TYPE: (match: string) => `Unknown match type '${match}'`,

    // Generic errors
    NOT_INSTANTIABLE: (constructor: string) => `${constructor} is not instantiable`,
    NOT_IMPLEMENTED: (constructor: string, method: string) => `${constructor}#${method} has not been implemented`,
    INVALID_TYPE: (name: string, expected: string, vowel: boolean = false) => `Value of '${name}' was not ${vowel ? 'an' : 'a'} ${expected}`
};

/**
 * Represents an error for Galacy
 * @param key - The key used to search for the key.
 * @param args - The arguments given with the error.
 */
export default class GalacyError extends Error {
    private readonly code: string;

    public constructor(key: string, ...args: any[]) {
        if (ErrorMessages[key] == null) throw new TypeError(`Error key '${key}' does not exist`);
        const message = typeof ErrorMessages[key] === "function"
            ? ErrorMessages[key](...args)
            : ErrorMessages[key]

        super(message);
        this.code = key;
    }

    public get name(): string {
        return `GalacyError [${this.code}]`;
    }
}