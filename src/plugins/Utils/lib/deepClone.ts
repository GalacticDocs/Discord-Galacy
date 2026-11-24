import { isObject, isPrimitive } from "../index";

/**
 * Deep clone a value.
 * @param source The object to clone.
 */
export function deepClone<T>(source: T) {
	// Check if it's a primitive (with exception of function and null, which is typeof object)
	if (source === null || isPrimitive(source)) return source;
	if (Array.isArray(source)) {
		const output = [];
		for (const value of source) output.push(deepClone(value));

		return output;
	}
	if (isObject(source)) {
		const output = {};
		for (const [key, value] of Object.entries(source))
            // @ts-ignore - Object indexing in TypeScript is hard to tweak.
			output[key] = deepClone(value);

		return output;
	}
    if (source instanceof Map) {
        const output = source;
		for (const [key, value] of source.entries()) output.set(key, deepClone(value));

		return output;
    }
	if (source instanceof Set) {
		const output = source;
		for (const value of source.values()) output.add(deepClone(value));

		return output;
	}

	return source;
}
