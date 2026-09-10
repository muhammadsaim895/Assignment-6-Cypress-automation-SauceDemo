// This file runs before every single spec file. It's the standard
// place Cypress expects global config and custom commands to be wired
// up from, so all of our commands.js additions get loaded here.
import './commands';

// Uncomment if a spec should ignore uncaught exceptions thrown by the
// app under test rather than failing the Cypress test because of them.
// Cypress.on('uncaught:exception', () => false);
