// Cypress support file
// This file is processed and loaded before the test files execute

// You can use this file to perform actions that apply to all tests
// For example, you could add custom commands or execute code before each test

Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent Cypress from failing the test
  return false
})
