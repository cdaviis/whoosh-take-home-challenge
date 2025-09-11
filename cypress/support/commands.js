import { createdTags, clearCreatedTags } from './utils/tagUtils'
import { createdEvents, clearCreatedEvents } from './utils/eventUtils'
import EventTagsSettingsPage from './pages/admin/eventTagsSettingsPage'

const eventTagsSettingsPage = new EventTagsSettingsPage()

/**
 * Command to clean up all tags created during tests
 */
Cypress.Commands.add('cleanupTags', () => {
  if (createdTags.length === 0) return
  
  // Navigate to the event tags settings page
  cy.visit('/admin/settings')
  eventTagsSettingsPage.elements.eventTagsSettings().click()
  
  // Delete each tag
  cy.get('[data-testid^="delete-event-tag-EventTag:"]').each(($el) => {
    cy.wrap($el).click()

    // Confirm deletion if there's a confirmation dialog
    cy.get('button').contains('Delete').click()
  })
  
  // Clear the created tags list
  clearCreatedTags()
})

/**
 * Command to clean up all events created during tests
 */
Cypress.Commands.add('cleanupEvents', () => {
  if (createdEvents.length === 0) return
  
  // Navigate to events page
  cy.visit('/events')
  
  // Delete each event
  createdEvents.forEach(eventName => {
    cy.contains(eventName).click()
    cy.get('[data-cy="delete-event-button"]').click()
    cy.get('button').contains('Delete').click()
  })
  
  // Clear the created events list
  clearCreatedEvents()
})
