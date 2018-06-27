describe('Location selector', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('checks for language selection', () => {
    cy.get('#location-dropdown-toggle-btn')
      .click();

    cy.get('#languageSelectBoxIt')
      .click();

    cy.get('#languageSelectBoxItOptions')
      .contains('Deutsch')
      .click();
  });
});
