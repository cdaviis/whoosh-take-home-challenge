class EventsPage {
  createEventButton() {
    return cy.contains('Create Event')
  }

  eventNameField() {
    return cy.get('[data-cy="event-name"]')
  }

  searchTagField() {
    return cy.get('.r-1awozwy > .css-g5y9jx > [data-testid="event-tags-select"]')
  }

  nextButton() {
    return cy.contains('button', 'Next')
  }

  completeCreateEventButton() {
    return cy.get('.r-5kz9s3 > .r-l1e7u4')
  }

  detailsTab() {
    return cy.contains('Details')
  }

  saveButton() {
    return cy.contains('Save')
  }

  closeButton() {
    return cy.get('[data-cy="drawer-close-button-undefined"]')
  }

  closeEventDetailsButton() {
    return cy.get('[style="display: flex; flex: 1 1 0%; min-height: 0px; opacity: 1;"] > .r-13awgt0 > :nth-child(3) > :nth-child(1) > .css-g5y9jx')
  }

  tagFilterDropdown() {
    return cy.get('[data-testid="event-tags-select-trigger-display-value"]')
  }

  closeTagFilterDropdown() {
    return cy.get('[data-testid="modal-overlay"]').click().wait(2000)
  }

  editTagsOnEventIcon() {
    return cy.get('[style="display: flex; flex: 1 1 0%; min-height: 0px; opacity: 1;"] > .r-13awgt0 > :nth-child(3) > :nth-child(1) > .css-g5y9jx')
  }

  fillEventDescriptionDetails(eventName, tags, setEventTime = null, skipNonRequiredFields = true) {
    cy.get('[data-cy="event-name"]').type(eventName)

    for (let tag of tags) {
      cy.get('.r-1awozwy > .css-g5y9jx > [data-testid="event-tags-select"]').click().then(() => {
        cy.get('.r-6dt33c > .css-g5y9jx.r-13qz1uu > .r-1awozwy > .css-g5y9jx > [data-testid="text-input"]').type(tag)
        cy.contains(`Add ${tag}`).click()
      })
    }

    // TODO: For now hardcoding to option 1 as this options maps to 7:00 am in the dropdown but 
    // will need to refactor and add a custom dropdown component where the user can select event times 
    if (setEventTime) {
      cy.get('#start-time-indicator > .css-17p9k4v-control').click().wait(2000).then(() => {
        cy.get('#react-select-start-time-indicator-instance-option-1').click().wait(2000)
      })
      this.nextButton().click().wait(2000)
    }
  
    if (skipNonRequiredFields) {
      for (let i = 0; i < 4; i++) {
        // skip the four remaining event details screens by clicking `Next` button
        this.nextButton().click().wait(2000)
      }
    }

    this.completeCreateEventButton().click().wait(2000)
  }

  addTagsOnExistinEvent(tags) {
    this.editTagsOnEventIcon().click().wait(2000)
    
    for (let tag of tags) {
      cy.get(':nth-child(2) > :nth-child(1) > .css-g5y9jx.r-13qz1uu > .r-1awozwy > .css-g5y9jx > [data-testid="text-input"]').click().then(() => {
        cy.get('.r-6dt33c > .css-g5y9jx.r-13qz1uu > .r-1awozwy > .css-g5y9jx > [data-testid="text-input"]').type(tag2)
        cy.contains(`Add ${tag2}`).click()
      })
    }
  }

  closeEventDetails() {
    this.closeEventDetailsButton().click().wait(2000)
    return this
  }
  
  openEvent(eventName) {
    cy.contains(eventName).click().wait(2000)
    return this
  }

  selectTab(tabName) {
    cy.contains(tabName).click().wait(2000)
    return this
  }

  addTagsToEventDetails(tags) {
    for (let tag of tags) {
      cy.get(':nth-child(2) > :nth-child(1) > .css-g5y9jx.r-13qz1uu > .r-1awozwy > .css-g5y9jx > [data-testid="text-input"]').click().then(() => {
        cy.get('.r-6dt33c > .css-g5y9jx.r-13qz1uu > .r-1awozwy > .css-g5y9jx > [data-testid="text-input"]').type(tag)
        cy.contains(`Add ${tag}`).click()
      })
    }
  }

  filterByEventTags(tags) {
    for (let tag of tags) {
      cy.get('[data-testid="event-tags-select-trigger-display-value"]').click().wait(2000).then(() => {
        cy.contains(tag).click().wait(2000)
        cy.get('[data-testid="modal-overlay"]').click().wait(2000)
      })
    }
  }
}

export default EventsPage
