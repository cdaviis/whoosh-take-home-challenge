class AdminSidePanel {
  eventsIcon() {
    return cy.get('[data-cy="main-nav-item-events-desktop"]')
  }

  eventTagsSettings() {
    return cy.get('.r-ual38e > :nth-child(2) > :nth-child(5)')
  }
}

export default AdminSidePanel
