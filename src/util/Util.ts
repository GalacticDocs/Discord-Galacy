export default class Util {
    /** Verify whether the provided value is an `Promise` or not. */
    public static isPromise(value: any): boolean {
        return value
            && typeof value.then === "function"
            && typeof value.then === "function";
    }

    /** Verify whether the provided value is an `EventEmitter` or not. */
    public static isEventEmitter(value: any): boolean {
        return value
            && typeof value.on === "function"
            && typeof value.emit === "function";
    }

    public static prefixCompare(aKey: any, bKey: any): number {
        if (aKey === '' && bKey === '') return 0;
        if (aKey === '') return 1;
        if (bKey === '') return -1;

        if (typeof aKey === 'function' && typeof bKey === 'function') return 0;
        if (typeof aKey === 'function') return 1;
        if (typeof bKey === 'function') return -1;

        return aKey.length === bKey.length
            ? aKey.localeCompare(bKey)
            : bKey.length - aKey.length;
    }
}