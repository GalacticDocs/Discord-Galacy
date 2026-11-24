const PRIMITIVE_TYPES = ["string", "boolean", "number", "bigint"];

/**
 * Check whether a value is a primitive.
 * @param input The input to check.
 */
export function isPrimitive(
	input: unknown
): input is string | bigint | number | boolean {
    return PRIMITIVE_TYPES.includes(typeof input);
}
