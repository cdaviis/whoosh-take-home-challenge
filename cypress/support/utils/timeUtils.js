/**
 * Utility functions for timestamp generation and time-related operations
 */

/**
 * Generates a 16-digit unique timestamp
 * Combines the current timestamp (13 digits) with 3 random digits
 * @returns {string} A 16-digit unique timestamp string
 */
export const generateUniqueTimestamp = () => {
  const timestamp = Date.now();
  const randomDigits = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${timestamp}${randomDigits}`;
};

/**
 * Formats a date in YYYY-MM-DD format
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

/**
 * Gets the current date in YYYY-MM-DD format
 * @returns {string} Current date in YYYY-MM-DD format
 */
export const getCurrentDate = () => {
  return formatDate(new Date());
};

/**
 * Gets a future date in YYYY-MM-DD format
 * @param {number} daysInFuture - Number of days in the future
 * @returns {string} Future date in YYYY-MM-DD format
 */
export const getFutureDate = (daysInFuture) => {
  const date = new Date();
  date.setDate(date.getDate() + daysInFuture);
  return formatDate(date);
};
