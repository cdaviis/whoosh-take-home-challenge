import { addCreatedTag } from '../../utils/tagUtils'

class EventInfo {

  selectors = {
    eventDetailsTab: 'Details',
    closeButton: '[data-cy="drawer-close-button-undefined"]',
    tagsSection: '[data-cy="event-tags-section"]',
    tagsList: '[data-cy="event-tags-list"]',
    tagItem: '[data-cy="tag-item"]',
    addTagButton: '[data-cy="add-tag-button"]',
    tagNameInput: '[data-cy="tag-name-input"]',
    saveTagButton: 'button:contains("Add Tag")',
    cancelTagButton: 'button:contains("Cancel")',
    removeTagButton: '[data-cy="remove-tag-button"]',
    editEventButton: '[data-cy="edit-event-button"]',
    deleteEventButton: '[data-cy="delete-event-button"]'
  }
  
  clickEventDetailsTab() {
    cy.contains(this.selectors.eventDetailsTab).click()
    return this
  }
  
  clickCloseButton() {
    cy.get(this.selectors.closeButton).click()
    return this
  }
  
  clickAddTagButton() {
    cy.get(this.selectors.addTagButton).click()
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
  
  clickRemoveTagButton(tagName) {
    cy.contains(this.selectors.tagItem, tagName).find(this.selectors.removeTagButton).click()
    return this
  }
  
  clickEditEventButton() {
    cy.get(this.selectors.editEventButton).click()
    return this
  }
  
  clickDeleteEventButton() {
    cy.get(this.selectors.deleteEventButton).click()
    return this
  }
  
  /**
   * Verifies that a tag exists on the event
   * @param {string} tagName - Name of the tag to verify
   */
  verifyTagExists(tagName) {
    cy.get(this.selectors.tagsSection).should('be.visible')
    cy.contains(this.selectors.tagItem, tagName).should('be.visible')
  }
  
  /**
   * Adds a tag to an existing event
   * @param {string} tagName - Name of the tag to add
   */
  addTagToEvent(tagName) {
    this.clickAddTagButton()
    this.typeTagName(tagName)
    this.clickSaveTagButton()
    
    addCreatedTag(tagName)
  }
  
  /**
   * Removes a tag from an existing event
   * @param {string} tagName - Name of the tag to remove
   */
  removeTagFromEvent(tagName) {
    this.clickRemoveTagButton(tagName)
  }
  
  /**
   * Closes the event info panel
   */
  closeEventInfo() {
    this.clickCloseButton()
  }
}

export default EventInfo
