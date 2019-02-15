describe('Location selector', () => {
  context('with initial DE', () => {
    beforeEach(() => {
      localStorage.setItem('locale', 'de');
      cy.visit('/product/lemare-booties-0778-grey/M0E20000000E0WX');
    });

    it('changes text to EN', () => {
      cy.get('[data-test=product-name]').should('contain', 'Stiefeletten Lemare grau');
      cy.get('[data-test=stores-link]').should('contain', 'Filiale');

      cy.get('[data-test=location-selector-open-button]').click();
      cy.get('span[data-test=location-selector-dropdown]')
        .click()
        .parent()
        .contains('English')
        .click()
        .should(() => {
          expect(localStorage.getItem('locale')).to.eq('en');
        });

      cy.get('[data-test=product-name]').should('contain', 'Booties Lemare grey');
      cy.get('[data-test=stores-link]').should('contain', 'Stores');

      cy.get('span[data-test=location-selector-dropdown]')
        .parent()
        .should('exist')
        .trigger('mouseleave')
        .should('not.exist');
    });
  });
});
