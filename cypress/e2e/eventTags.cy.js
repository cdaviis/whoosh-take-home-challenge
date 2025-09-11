import LoginPage from '../support/pages/auth/loginPage'
import GolfEventsPage from '../support/pages/golf/eventsPage'
import EventTagsSettingsPage from '../support/pages/admin/eventTagsSettingsPage'
import SidePanel from '../support/pages/components/sidePanel'
import { generateUniqueTagName } from '../support/utils/tagUtils'
import { generateUniqueTimestamp } from '../support/utils/timeUtils'

const loginPage = new LoginPage()
const golfEventsPage = new GolfEventsPage()
const eventTagsSettingsPage = new EventTagsSettingsPage()
const sidePanel = new SidePanel()

describe('Event Tags — Smoke Test', () => {
  let staffUser
  let adminUser
  
  before(() => {
    cy.fixture('users.json').then((userData) => {
      staffUser = userData.users.find(user => user.type === 'staff')
      adminUser = userData.users.find(user => user.type === 'admin')
    })
  })

  const uniqueTag = generateUniqueTagName('AutoTag')
  const eventTitle = `AutoEvent_${generateUniqueTimestamp()}`
  let secondEventTitle

  beforeEach(() => {
    cy.visit('/login')
    loginPage.userLogin(staffUser.email, staffUser.password)
    sidePanel.waitForNavigation()
  })

  afterEach(() => {
    cy.cleanupEvents()
    cy.cleanupTags()
  })
  
  it('TC-001: Staff user creates an event with a new tag', () => {
    sidePanel.clickEventsIcon()
    const firstEventName = golfEventsPage.createEvent({
      name: eventTitle,
      description: 'Test event description',
      date: '2025-10-01',
      location: 'Test Location',
      tags: [uniqueTag]
    })

    golfEventsPage.openEvent(firstEventName)
    golfEventsPage.eventInfo.verifyTagExists(uniqueTag)
    golfEventsPage.eventInfo.closeEventInfo()
    secondEventTitle = `Second_${generateUniqueTimestamp()}`
    const secondEventName = golfEventsPage.createEvent({
      name: secondEventTitle,
      description: 'Second event description',
      date: '2025-10-02',
      location: 'Test Location',
      tags: [uniqueTag]
    })
    
    golfEventsPage.openEvent(secondEventName)
    golfEventsPage.eventInfo.verifyTagExists(uniqueTag)
    golfEventsPage.eventInfo.closeEventInfo()
    
    cy.visit('/logout')
    loginPage.userLogin(adminUser.email, adminUser.password)
    sidePanel.waitForNavigation()
    eventTagsSettingsPage.navigateToEventTagsSettings()
    eventTagsSettingsPage.verifyTagExists(uniqueTag)
    eventTagsSettingsPage.verifyTagUsageCount(uniqueTag, 2)
  })

  xit('TC-002: Staff user filters events by a single tag and sees only matching events', () => {
    sidePanel.clickEventsIcon()
    golfEventsPage.navigateToEventsPage()
    golfEventsPage.filterByTag(uniqueTag)
    golfEventsPage.verifyEventVisible(eventTitle)
    golfEventsPage.verifyEventVisible(secondEventTitle)

    const differentTag = generateUniqueTagName('DifferentTag')
    const differentEventName = golfEventsPage.createEvent({
      name: `Different_${generateUniqueTimestamp()}`,
      description: 'Event with different tag',
      date: '2025-10-03',
      location: 'Test Location',
      tags: [differentTag]
    })

    golfEventsPage.filterByTag(uniqueTag)
    golfEventsPage.verifyEventVisible(eventTitle)
    golfEventsPage.verifyEventVisible(secondEventTitle)
    golfEventsPage.verifyEventNotVisible(differentEventName)
    golfEventsPage.clearFilters()
    golfEventsPage.verifyEventVisible(eventTitle)
    golfEventsPage.verifyEventVisible(secondEventTitle)
    golfEventsPage.verifyEventVisible(differentEventName)

    cy.visit('/logout')
    
    loginPage.userLogin(adminUser.email, adminUser.password)
    sidePanel.waitForNavigation()

    eventTagsSettingsPage.navigateToEventTagsSettings()
    eventTagsSettingsPage.verifyTagExists(uniqueTag)
    eventTagsSettingsPage.verifyTagExists(differentTag)
  })
})
