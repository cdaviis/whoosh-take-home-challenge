import EventCreationForm from '../components/eventCreationForm'
import EventInfo from '../components/eventInfo'

class EventsPage extends EventCreationForm {

  constructor() {
    super()
    this.eventInfo = new EventInfo()
  }

  selectors = {
    eventsList: '[data-cy="events-list"]',
    eventItem: '[data-cy="event-item"]',
    filterSection: '[data-testid="filter-section"]',
    tagFilterDropdown: '[data-testid="events-filter"]',
    tagFilterOption: '[data-testid="filter-tag-option"]',
    activeFilters: '[data-testid="active-filters"]',
    activeFilterTag: '[data-testid="tag-chip"]',
    clearFiltersButton: '[data-testid="clear-filters"]'
  }
  
  clickTagFilterDropdown() {
    cy.get(this.selectors.tagFilterDropdown).click()
    return this
  }
  
  clickTagFilterOption(tagName) {
    cy.contains(this.selectors.tagFilterOption, tagName).click()
    return this
  }
  
  clickClearFiltersButton() {
    cy.get(this.selectors.clearFiltersButton).click()
    return this
  }
  
  clickEventItem(eventName) {
    cy.contains(this.selectors.eventItem, eventName).click()
    return this
  }
  
  /**
   * Navigates to the golf events page
   */
  navigateToEventsPage() {
    cy.visit('/golf/events')
    return this
  }
  
  /**
   * Opens an event by name
   * @param {string} eventName - Name of the event to open
   */
  openEvent(eventName) {
    this.clickEventItem(eventName)
    return this
  }
  
  /**
   * Filters events by tag
   * @param {string} tagName - Name of the tag to filter by
   */
  filterByTag(tagName) {
    this.clickTagFilterDropdown()
    this.clickTagFilterOption(tagName)
    
    // Click apply filters button
    cy.get('[data-testid="apply-filters"]').click()
    
    // Verify the filter is applied
    cy.contains(this.selectors.activeFilterTag, tagName).should('be.visible')
    return this
  }
  
  /**
   * Clears all filters
   */
  clearFilters() {
    this.clickClearFiltersButton()
    return this
  }
  
  /**
   * Verifies that an event is visible in the list
   * @param {string} eventName - Name of the event to verify
   */
  verifyEventVisible(eventName) {
    cy.contains(this.selectors.eventItem, eventName).should('be.visible')
    return this
  }
  
  /**
   * Verifies that an event is not visible in the list
   * @param {string} eventName - Name of the event to verify
   */
  verifyEventNotVisible(eventName) {
    cy.contains(this.selectors.eventItem, eventName).should('not.exist')
    return this
  }
}

export default EventsPage
