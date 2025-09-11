/**
 * Utility functions for event management
 */

/**
 * Store for created events to be used for cleanup
 */
export const createdEvents = []

/**
 * Generates a unique event name with timestamp
 * @param {string} baseName - Base name for the event
 * @returns {string} - Unique event name with timestamp
 */
export const generateUniqueEventName = (baseName = 'TestEvent') => {
  const timestamp = new Date().getTime()
  return `${baseName}_${timestamp}`
}

/**
 * Add an event to the created events list
 * @param {string} eventName - Name of the event to add
 */
export const addCreatedEvent = (eventName) => {
  createdEvents.push(eventName)
}

/**
 * Clear the created events list
 */
export const clearCreatedEvents = () => {
  createdEvents.length = 0
}
