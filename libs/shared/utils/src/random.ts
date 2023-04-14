/**
 * Returns a random integer between the specified minimum and maximum values (inclusive).
 *
 * @param {number} min - The minimum value (inclusive). Default is 0.
 * @param {number} max - The maximum value (inclusive). Default is 1.
 * @returns {number} A random integer between the specified minimum and maximum values.
 */
export const getRandomInt = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Returns a random color as a hex string.
 *
 * @returns {string} A random color as a hex string, in the format "#RRGGBB"
 */
export const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;
