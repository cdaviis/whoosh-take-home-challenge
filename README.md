# Whoosh Take Home Challenge

> *Note: This repo was built as a mock for a take-home challenge. The framework scaffolding is in place, and I’m currently adding/polishing test cases (starting with TC-001). 
The intent was to show my approach to automation and not a fully complete suite.*

## Getting Started

### Prerequisites
- Node.js (latest LTS version recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/cdaviis/whoosh-take-home-challenge.git

# Navigate to project directory
cd whoosh-take-home-challenge

# Install dependencies
npm install
```

### Running Tests
```bash
# Open Cypress Test Runner
npx cypress open

# Run tests headlessly
npx cypress run
```

## Configuration
Tests are configured to run against the preview environment:
- Base URL: https://deploy-preview-6907--whoosh-staff-master.netlify.app

## Project Structure
- `cypress/e2e/eventTags.cy.js` - Consolidated smoke tests for event tags functionality
- `cypress/fixtures/users.json` - Test users data
- `cypress/downloads/` - Downloaded files during test runs
- `cypress/screenshots/` - Automatically captured screenshots on test failures

## CI/CDs
- Tests automatically run on push to main branch and on pull requests
- Test results, screenshots (on failure), and videos are available as artifacts
- Configuration is defined in `.github/workflows/cypress-tests.yml`
