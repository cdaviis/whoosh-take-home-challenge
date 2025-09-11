/**
 * Utility functions for event tag management
 */

/**
 * Generates a unique tag name with timestamp
 * @param {string} baseName - Base name for the tag
 * @returns {string} - Unique tag name with timestamp
 */
export const generateUniqueTagName = (baseName = 'TestTag') => {
  const timestamp = new Date().getTime()
  return `${baseName}_${timestamp}`
}

/**
 * Store for created tags to be used for cleanup
 */
export const createdTags = []

/**
 * Add a tag to the created tags list
 * @param {string} tagName - Name of the tag to add
 */
export const addCreatedTag = (tagName) => {
  createdTags.push(tagName)
}

/**
 * Clear the created tags list
 */
export const clearCreatedTags = () => {
  createdTags.length = 0
}
