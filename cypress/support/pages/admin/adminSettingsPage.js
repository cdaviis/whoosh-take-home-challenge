class AdminSettingsPage {

  selectors = {
    eventTagsSettings: '.r-ual38e > :nth-child(2) > :nth-child(5)'
  }
  
  clickEventTagsSettings() {
    cy.get(this.selectors.eventTagsSettings).click()
    return this
  }
  
  navigateToEventTagsSettings() {
    cy.visit('/admin/settings')
    this.clickEventTagsSettings()
    return this
  }
}

export default AdminSettingsPage
