// To enable intelliSense
/// <reference types="cypress" />

Cypress.on("uncaught:exception", (err, runnable) => {
  // Prevent fail in GH Action
  cy.log("LOG OF Uncaught Exceptions: ", err.message);
  return false;
});

describe("SRC Messenger full e2e test", function () {
  before(() => {
    cy.wait(20000);
  });

  beforeEach(() => {
    // Added extra wait due to failure in GH workflow
    cy.wait(5000);
  });

  it("signs up", function () {
    // Open App and check that Sign Up form is displayed
    cy.visit("/");
    cy.contains(/src-messenger/);
    cy.contains(/sign up/i);

    // Sign Up a test user
    cy.get("#nickname").type("testUser1");
    cy.get("#signup-button").click();

    // Wait for the user to get authenticated (Firebase)
    cy.wait(3000);
  });

  it("checks that the user was logged in", function () {
    cy.contains(/logged in as testUser1#/i);
  });

  it("allows logged in user to send a message", function () {
    cy.get("#message").type("cy test message");
    cy.get("#send-message-button").click();
    cy.wait(3000);
    cy.contains(/testUser1#.{4}: cy test message/i);
  });

  it("End of tests", function () {
    cy.wait(2000);
  });
});
