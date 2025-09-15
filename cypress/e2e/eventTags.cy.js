import LoginPage from '../support/pages/auth/loginPage'
import AdminSidePanel from '../support/pages/components/adminSidePanel'
import EventsPage from '../support/pages/eventsPage'
import { generateUniqueTimestamp } from '../support/utils/timeUtils'

const loginPage = new LoginPage()
const adminSidePanel = new AdminSidePanel()
const eventsPage = new EventsPage()

describe('Event Tags — Smoke Test', () => {
  let staffUser, adminUser, tag1, tag2, event1Name, event2Name
  
  before(() => {
    cy.fixture('users.json').then((userData) => {
      staffUser = userData.users.find(user => user.type === 'staff')
      adminUser = userData.users.find(user => user.type === 'admin')
    })
  })
  
  beforeEach(() => {
    tag1 = `AutoTag_${generateUniqueTimestamp()}`
    tag2 = `AutoTag_${generateUniqueTimestamp()}`
    event1Name = `AutoEvent_${generateUniqueTimestamp()}`
    event2Name = `AutoEvent_${generateUniqueTimestamp()}`
    
    cy.visit('/login')
    loginPage.userLogin(staffUser.email, staffUser.password)
    adminSidePanel.eventsIcon().should('be.visible')
  })
  
  afterEach(() => {
    cy.visit('/logout')

    // TODO: Commenting out as this is not implemented yet
    // cy.cleanupEvents()
    // cy.cleanupTags()
  })
  
  it('TC-001: Smoke Test - Staff user adds tags to events, filters events by tag and admin verifies tag exists on admin settings page', () => {
    const tag3 = `AutoTag_${generateUniqueTimestamp()}`
    
    cy.visit('/app/golf/events')

    // Create first event with tag1
    eventsPage.createEventButton().click()
    eventsPage.fillEventDescriptionDetails(event1Name, [tag1])
    
    // Verify tag1 exists on event details page
    eventsPage.openEvent(event1Name)
    eventsPage.selectTab('Details')
    cy.contains(tag1).should('be.visible')

    // Add tag2 to first event
    eventsPage.addTagsOnExistinEvent([tag2])
    eventsPage.saveButton().click({force: true}).wait(2000)
    eventsPage.closeEventDetails()

    // Create second event with tag3
    eventsPage.createEventButton().click()
    eventsPage.fillEventDescriptionDetails(event2Name, [tag3], '7:00 AM')

    // Open the second event
    eventsPage.openEvent(event2Name)
    eventsPage.selectTab('Details')
    cy.contains(tag3).should('be.visible')
    eventsPage.closeEventDetails()

    // Filter events by tag3
    eventsPage.filterByEventTags([tag3])
    cy.contains(event2Name).should('be.visible')
    cy.contains(event1Name).should('not.exist')
    
    cy.visit('/logout')
    
    // Login as admin user
    loginPage.userLogin(adminUser.email, adminUser.password)
    adminSidePanel.eventsIcon().should('be.visible')

    // Navigate to event tags settings page
    cy.visit('/app/admin/settings')
    adminSidePanel.eventTagsSettings().click()
    
    // Verify all tags exist
    cy.contains(tag1).should('be.visible')
    cy.contains(tag2).should('be.visible')
    cy.contains(tag3).should('be.visible')
  })
})
