class SidePanel {
  
  selectors = {
    eventsIcon: '[data-cy="main-nav-item-events-desktop"]',
    racquetIcon: '[data-testid="department-switcher-racquet"]',
    golfIcon: '[data-testid="department-switcher-golf"]',
    adminIcon: '[data-cy="department-switcher-admin-btn"]'
  }

  clickEventsIcon() {
    cy.get(this.selectors.eventsIcon).click()
    return this
  }
  
  clickRacquetIcon() {
    cy.get(this.selectors.racquetIcon).click()
    return this
  }
  
  clickGolfIcon() {
    cy.get(this.selectors.golfIcon).click()
    return this
  }
  
  clickAdminIcon() {
    cy.get(this.selectors.adminIcon).click()
    return this
  }

  waitForNavigation(timeout = 5000) {
    cy.get(this.selectors.eventsIcon, { timeout }).should('be.visible')
    return this
  }
} 

export default SidePanel
