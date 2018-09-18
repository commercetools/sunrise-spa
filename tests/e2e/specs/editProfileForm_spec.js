describe('edit profile form', () => {
  before(() => {
    cy.visit('/');
    cy.get('[data-test=login-button]').click();

    cy.get('[data-test=login-form-email]').type('minnie.mouse@commercetools.com');
    cy.get('[data-test=login-form-password]').type('password');
    cy.get('[data-test=login-form-submit]').click();

    cy.get('[data-test=personal-details-box-name]').should('contain', 'Minnie Mousey');
    cy.get('[data-test=personal-details-box-email]').should('contain', 'minnie.mouse@commercetools.com');
  });

  it('updates customer info', () => {
    cy.get('[data-test=personal-details-edit-show-btn]').click();

    cy.get('input[data-test=edit-form-firstName]').clear()
      .type('Mickey');

    cy.get('input[data-test=edit-form-email]').clear()
      .type('mickey.mouse@commercetools.com');

    cy.get('input[data-test=edit-form-lastName]').clear()
      .type('Mouse');

    cy.get('[data-test=edit-form-submit]').click();

    cy.get('[data-test=personal-details-box-name]').should('contain', 'Mickey Mouse');
    cy.get('[data-test=personal-details-box-email]').should('contain', 'mickey.mouse@commercetools.com');
  });
});
