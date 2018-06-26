describe('Location selector', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('checks for language selection', () => {
    cy.get('#location-dropdown-toggle-btn')
      .click()
      .parent()
      .find('#languageSelectBoxItOptions');
  });
});
