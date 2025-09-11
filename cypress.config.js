const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://deploy-preview-6907--whoosh-staff-master.netlify.app',
    viewportWidth: 1280,
    viewportHeight: 720
  },
})
