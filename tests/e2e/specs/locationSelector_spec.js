describe('Location selector', () => {
  beforeEach(() => {
    cy.visit('/product/hoganrebel-r261-sneaker-6708K62AZC-grau/M0E20000000DX1Y');
  });

  it('changes text to selected language', () => {
    cy.changeLanguage('Deutsch');

    cy.get('[data-test=product-name]')
      .should('contain', 'Sneakers „R261” Hogan Rebel grau', { timeout: Cypress.config('graphqlTimeout') });
    cy.get('[data-test=stores-link]')
      .should('contain', 'Filiale');

    cy.changeLanguage('English');
    cy.get('[data-test=product-name]')
      .should('contain', 'Sneakers ”R261” Hogan Rebel grey', { timeout: Cypress.config('graphqlTimeout') });
    cy.get('[data-test=stores-link]').should('contain', 'Stores');
  });

  it('changes prices to selected country', () => {
    cy.changeCountry('United States');
    cy.get('[data-test=product-original-price]').contains(/^\s*(US)?\$343.75\s*$/);
    cy.changeCountry('Deutschland');
    cy.get('[data-test=product-original-price]').contains(/^\s*275,00\s€\s*$/);
  });

  it('opens and closes location selector', () => {
    cy.changeLanguage('Deutsch');
    cy.get('span[data-test=language-selector-dropdown]')
      .parent()
      .should('not.exist');

    cy.get('[data-test=location-selector-open-button]').click();
    cy.get('span[data-test=language-selector-dropdown]')
      .parent()
      .should('exist')
      .trigger('mouseleave')
      .should('not.exist');

    cy.get('[data-test=location-selector-open-button]').click();
    cy.get('span[data-test=language-selector-dropdown]')
      .parent()
      .should('exist');

    cy.get('[data-test=location-selector-open-button]').click();
    cy.get('span[data-test=language-selector-dropdown]')
      .parent()
      .should('not.exist');
  });
});
