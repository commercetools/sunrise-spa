// https://docs.cypress.io/api/introduction/api.html

describe('My first test', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Check categories children', () => {
    cy.get('#navigation ul.categories-1st-level > li:nth-child(2)');
  });
});
