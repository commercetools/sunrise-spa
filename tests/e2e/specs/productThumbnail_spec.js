import _const from '../support/const';

describe('Product thumbnail', () => {
  before(() => {
    cy.visit('/products/men?sort=oldest');
  });

  it('displays product information', () => {
    cy.get('[data-test=product-thumbnail-name]', { timeout: Cypress.config('graphqlTimeout') })
      .contains(_const.one.NAME)
      .parentsUntil('[data-test=product-list]')
      .then(($thumbnail) => {
        cy.wrap($thumbnail)
          .find('img')
          .should('have.attr', 'src')
          .should('include', '.jpg');

        cy.wrap($thumbnail)
          .find('[data-test=product-thumbnail-sale-flag]')
          .should('exist');

        cy.wrap($thumbnail)
          .find('[data-test=price-old-value]')
          .contains(new RegExp(`^\\s*${_const.one.OLD_PRICE}\\s€\\s*$`));

        cy.wrap($thumbnail)
          .find('[data-test=price-new-value]')
          .contains(new RegExp(`^\\s*${_const.one.PRICE}\\s€\\s*$`));
      });
    cy.visit('/products/men/2?sort=oldest');
    cy.get('[data-test=product-thumbnail-name]')
      .should((e) => {
        expect(e.text()).to.include(_const.three.NAME);
        return e;
      })
      .parentsUntil('[data-test=product-list]')
      .then(($thumbnail) => {
        cy.wrap($thumbnail)
          .find('[data-test=product-thumbnail-sale-flag]')
          .should('not.exist');

        cy.wrap($thumbnail)
          .find('[data-test=product-original-price]')
          .should((e) => {
            expect(e.text()).to.include(_const.three.PRICE);
          });

        cy.wrap($thumbnail)
          .find('[data-test=price-new-value]')
          .should('not.exist');
      });
  });
});
