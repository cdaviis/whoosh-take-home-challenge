import { addCreatedTag } from '../../utils/tagUtils'
import { addCreatedEvent, generateUniqueEventName } from '../../utils/eventUtils'

class EventCreationForm {

  selectors = {
    createEventButton: 'Create Event',
    eventNameInput: '[data-cy="event-name"]',
    eventDescriptionInput: '[data-cy="event-description"]',
    searchTags: '[data-testid="event-tags-select"]',
    eventDateInput: '[data-cy="event-date"]',
    eventTimeInput: '[data-cy="event-time"]',
    eventLocationInput: '[data-cy="event-location"]',
    saveEventButton: 'button:contains("Save")',
    cancelEventButton: 'button:contains("Cancel")',
    addTagButton: '[data-cy="add-tag-button"]',
    tagNameInput: '[data-cy="tag-name-input"]',
    saveTagButton: 'button:contains("Add Tag")',
    cancelTagButton: 'button:contains("Cancel")',
    tagsList: '[data-cy="tags-list"]',
    tagItem: '[data-cy="tag-item"]',
    removeTagButton: '[data-cy="remove-tag-button"]',
    tagFilterDropdown: '[data-cy="tag-filter-dropdown"]',
    tagFilterOption: '[data-cy="tag-filter-option"]'
  }
  
  clickCreateEventButton() {
    cy.contains('button', 'Create Event').click()
    return this
  }
  
  typeEventName(name) {
    cy.get(this.selectors.eventNameInput).type(name)
    return this
  }
  
  typeEventDescription(description) {
    cy.get(this.selectors.eventDescriptionInput).type(description)
    return this
  }
  
  typeEventDate(date) {
    cy.get(this.selectors.eventDateInput).type(date)
    return this
  }
  
  typeEventTime(time) {
    cy.get(this.selectors.eventTimeInput).type(time)
    return this
  }
  
  typeEventLocation(location) {
    cy.get(this.selectors.eventLocationInput).type(location)
    return this
  }
  
  clickAddTagButton() {
    cy.get(this.selectors.addTagButton).click()
    return this
  }
  
  clickSaveEventButton() {
    cy.contains('button', 'Save').click()
    return this
  }
  
  clickCancelEventButton() {
    cy.contains('button', 'Cancel').click()
    return this
  }
  
  typeTagName(name) {
    cy.get(this.selectors.tagNameInput).type(name)
    return this
  }
  
  clickSaveTagButton() {
    cy.contains('button', 'Add Tag').click()
    return this
  }
  
  clickCancelTagButton() {
    cy.contains('button', 'Cancel').click()
    return this
  }
  
  /**
   * Creates a new event with the given details
   * @param {Object} eventDetails - Event details
   * @param {string} eventDetails.name - Event name
   * @param {string} eventDetails.description - Event description
   * @param {string} eventDetails.date - Event date
   * @param {string} eventDetails.time - Event time
   * @param {string} eventDetails.location - Event location
   * @param {Array<string>} eventDetails.tags - Array of tag names to add to the event
   * @returns {string} - The name of the created event
   */
  createEvent(eventDetails) {
    const eventName = eventDetails.name || generateUniqueEventName()
    
    this.clickCreateEventButton()
    this.typeEventName(eventName)
    
    if (eventDetails.description) {
      this.typeEventDescription(eventDetails.description)
    }
    
    if (eventDetails.date) {
      this.typeEventDate(eventDetails.date)
    }
    
    if (eventDetails.time) {
      this.typeEventTime(eventDetails.time)
    }
    
    if (eventDetails.tags && eventDetails.tags.length > 0) {
      eventDetails.tags.forEach(tagName => {
        this.addTagToEvent(tagName)
      })
    }
    
    this.clickSaveEventButton()
    addCreatedEvent(eventName)
    return eventName
  }
  
  /**
   * Adds a tag to an event during creation
   * @param {string} tagName - Name of the tag to add
   */
  addTagToEvent(tagName) {
    this.clickAddTagButton()
    this.typeTagName(tagName)
    this.clickSaveTagButton()

    addCreatedTag(tagName)
  }
}

export default EventCreationForm
