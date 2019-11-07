describe('Location selector', () => {
  beforeEach(() => {
    cy.visit('/product/lemare-booties-0778-grey/M0E20000000E0WX');
  });

  it('changes text to selected language', () => {
    cy.changeLanguage('Deutsch');

    cy.get('[data-test=product-name]')
      .should('contain', 'Stiefeletten Lemare grau', { timeout: Cypress.config('graphqlTimeout') });
    cy.get('[data-test=stores-link]')
      .should('contain', 'Filiale');

    cy.changeLanguage('English');
    cy.get('[data-test=product-name]')
      .should('contain', 'Booties Lemare grey', { timeout: Cypress.config('graphqlTimeout') });
    cy.get('[data-test=stores-link]').should('contain', 'Stores');
  });

  it('opens and closes location selector', () => {
    cy.changeLanguage('Deutsch');
    cy.get('span[data-test=location-selector-dropdown]')
      .parent()
      .should('not.exist');

    cy.get('[data-test=location-selector-open-button]').click();
    cy.get('span[data-test=location-selector-dropdown]')
      .parent()
      .should('exist')
      .trigger('mouseleave')
      .should('not.exist');

    cy.get('[data-test=location-selector-open-button]').click();
    cy.get('span[data-test=location-selector-dropdown]')
      .parent()
      .should('exist');

    cy.get('[data-test=location-selector-open-button]').click();
    cy.get('span[data-test=location-selector-dropdown]')
      .parent()
      .should('not.exist');
  });
});
