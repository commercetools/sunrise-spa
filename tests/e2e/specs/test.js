// https://docs.cypress.io/api/introduction/api.html

describe('My first test', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Check categories children', () => {
    cy.get('#navigation ul.categories1stlevel > li:nth-child(2)').trigger('mouseover');
  });
});
