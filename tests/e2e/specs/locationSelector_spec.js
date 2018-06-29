describe('Location selector', () => {
  context('with initial DE', () => {
    beforeEach(() => {
      localStorage.setItem('locale', 'de');
      cy.visit('/');
    });

    it('changes text to selected language', () => {
      cy.get('[data-test=stores-link]').contains('Filiale');

      cy.get('[data-test=location-selector-open-button]').click();

      cy.get('span[data-test=location-selector]')
        .click()
        .parent()
        .contains('English')
        .click()
        .should(() => {
          expect(localStorage.getItem('locale')).to.eq('en');
        });

      cy.get('[data-test=stores-link]').contains('Stores');
    });
  });
});
