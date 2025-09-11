import { addCreatedTag } from '../../utils/tagUtils'

class EventTagsSettingsPage {

  selectors = {
    eventTagsSettings: '.r-ual38e > :nth-child(2) > :nth-child(5)',
    tagsList: '[data-cy="event-tags-list"]',
    tagItem: '[data-cy="tag-item"]',
    tagUsageCount: '[data-cy="tag-usage-count"]',
    deleteTagButton: '[data-testid^="delete-event-tag-EventTag:"]',
    confirmDeleteButton: 'button:contains("Delete")',
    cancelDeleteButton: 'button:contains("Cancel")',
    createTagButton: '[data-cy="create-tag-button"]',
    tagNameInput: '[data-cy="tag-name-input"]',
    saveTagButton: 'button:contains("Create")',
    cancelTagButton: 'button:contains("Cancel")',
    notificationMessage: '[data-cy="notification-message"]'
  }
  
  clickEventTagsSettings() {
    cy.get(this.selectors.eventTagsSettings).click()
    return this
  }
  
  clickDeleteTagButton(tagName) {
    cy.contains(this.selectors.tagItem, tagName).find(this.selectors.deleteTagButton).click()
    return this
  }
  
  clickConfirmDeleteButton() {
    cy.contains(this.selectors.confirmDeleteButton).click()
    return this
  }
  
  clickCancelDeleteButton() {
    cy.contains(this.selectors.cancelDeleteButton).click()
    return this
  }
  
  clickCreateTagButton() {
    cy.get(this.selectors.createTagButton).click()
    return this
  }
  
  typeTagName(name) {
    cy.get(this.selectors.tagNameInput).type(name)
    return this
  }
  
  clickSaveTagButton() {
    cy.contains(this.selectors.saveTagButton).click()
    return this
  }
  
  clickCancelTagButton() {
    cy.contains(this.selectors.cancelTagButton).click()
    return this
  }
  
  /**
   * Navigates to the event tags settings page
   */
  navigateToEventTagsSettings() {
    cy.visit('/admin/settings')
    this.clickEventTagsSettings()
    return this
  }
  
  /**
   * Creates a new tag from the admin settings
   * @param {string} tagName - Name of the tag to create
   */
  createTag(tagName) {
    this.clickCreateTagButton()
    this.typeTagName(tagName)
    this.clickSaveTagButton()
    
    // Add the tag to the created tags list for cleanup
    addCreatedTag(tagName)
    return this
  }
  
  /**
   * Deletes a tag from the admin settings
   * @param {string} tagName - Name of the tag to delete
   */
  deleteTag(tagName) {
    this.clickDeleteTagButton(tagName)
    this.clickConfirmDeleteButton()
    
    // Verify the notification appears
    cy.get(this.selectors.notificationMessage).should('be.visible')
    return this
  }
  
  /**
   * Cancels tag deletion
   * @param {string} tagName - Name of the tag to cancel deletion for
   */
  cancelTagDeletion(tagName) {
    this.clickDeleteTagButton(tagName)
    this.clickCancelDeleteButton()
    return this
  }
  
  /**
   * Verifies that a tag exists in the admin settings
   * @param {string} tagName - Name of the tag to verify
   */
  verifyTagExists(tagName) {
    cy.contains(this.selectors.tagItem, tagName).should('be.visible')
    return this
  }
  
  /**
   * Verifies that a tag does not exist in the admin settings
   * @param {string} tagName - Name of the tag to verify non-existence
   */
  verifyTagDoesNotExist(tagName) {
    cy.contains(this.selectors.tagItem, tagName).should('not.exist')
    return this
  }
  
  /**
   * Verifies the usage count of a tag
   * @param {string} tagName - Name of the tag to verify
   * @param {number} count - Expected usage count
   */
  verifyTagUsageCount(tagName, count) {
    cy.contains(this.selectors.tagItem, tagName).find(this.selectors.tagUsageCount).should('contain', count)
    return this
  }
}

export default EventTagsSettingsPage
