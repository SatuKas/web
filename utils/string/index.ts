/**
 * Parses an error string to extract the main message and an optional error ID.
 *
 * @param {string} input - The error string to be parsed. Expected format: "Some error message [ID]: error-id".
 * @returns {{
 *   message: string; // The main error message, or the original input if parsing fails
 *   errorId: string | undefined; // The extracted error ID if present, otherwise undefined
 * }}
 *
 * @description
 * This function uses regular expressions to extract the error message and error ID from a string.
 * The expected format is: "Some error message [ID]: error-id".
 * If the format does not match, it will return the original input as the message and undefined as the errorId.
 */
export const parseErrorString = (
  input: string
): {
  message: string; // The main error message
  errorId: string | undefined; // The error ID if found, otherwise undefined
} => {
  // Regex to capture everything before " [ID]:" as the message
  const messageMatch = input.match(/^(.*)\s\[ID\]:/);
  // Regex to capture everything after "[ID]: " as the errorId
  const errorIdMatch = input.match(/\[ID\]:\s(.+)$/);

  if (messageMatch && errorIdMatch) {
    const message = messageMatch[1];
    const errorId = errorIdMatch[1];
    return { message, errorId };
  }

  // If the input doesn't match the expected format, return the whole input as message
  return { message: input, errorId: undefined };
};

/**
 * Replaces substrings in a string based on a mapping object.
 *
 * @param {string} str - The original string in which replacements will be made.
 * @param {Object} mapObj - An object where keys are the substrings to be replaced, and values are the corresponding replacement strings.
 *
 * @description
 * This function takes a string and a mapping object, and returns a new string where all occurrences of keys in the mapping object are replaced with their corresponding values.
 * It constructs a regular expression from the keys of the mapping object and uses it to perform case-insensitive replacements in the original string.
 */
export const replaceString = (str: string, mapObj: Record<string, string>) => {
  if (!str) {
    return str;
  }
  const re = new RegExp(Object.keys(mapObj).join('|'), 'gi');

  return str.replace(re, (matched: string) => mapObj[matched]);
};
