describe('Login box', () => {
  before(() => {
    cy.visit('/');
  });

  it('logs in', () => {
    cy.get('[data-test=login-button]').click();

    cy.get('[data-test=login-form-email]').type('willy.wonka@commercetools.com');
    cy.get('[data-test=login-form-password]').type('p@ssword');
    cy.get('[data-test=login-form-submit]').click();

    cy.get('[data-test=login-info-name]').should('contain', 'Willy');
    cy.get('[data-test=login-button]').should('not.exist');
    cy.get('[data-test=logout-button]').should('exist');

    cy.get('[data-test=logout-button]').click();

    cy.get('[data-test=login-button]').should('exist');
    cy.get('[data-test=logout-button]').should('not.exist');
    cy.get('[data-test=login-info-name]').should('not.exist');
  });
});
