/**
 * Recursively converts all object keys from snake_case to camelCase.
 *
 * @param {Record<string, any> | any[]} obj - The object or array to convert.
 * @returns {any} - A new object or array with all keys in camelCase.
 *
 * @example
 * mapSnakeCaseToCamelCase({ user_id: 1, user_data: { first_name: 'John' } })
 * // returns { userId: 1, userData: { firstName: 'John' } }
 *
 * mapSnakeCaseToCamelCase([{ item_id: 1 }, { item_id: 2 }])
 * // returns [{ itemId: 1 }, { itemId: 2 }]
 */
export const mapSnakeCaseToCamelCase = (obj: Record<string, any> | any[]): any => {
  if (Array.isArray(obj)) {
    // If array, map each item recursively
    return obj.map((item) => mapSnakeCaseToCamelCase(item));
  } else if (obj !== null && typeof obj === 'object') {
    // If object, process each key
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key.replace(/_([a-z])/g, (_, char) => char.toUpperCase()), // snake_case to camelCase
        mapSnakeCaseToCamelCase(value),
      ])
    );
  }
  // If not object/array, return value as is
  return obj;
};
