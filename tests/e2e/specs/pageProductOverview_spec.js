import _const from '../support/const';

describe('Product overview page', () => {
  const wFetch = window.fetch;
  const later = () => new Promise(
    r => setTimeout(r, 1000),
  );
  before(() => {
    window.fetch = function fetch() {
      // eslint-disable-next-line prefer-rest-params
      const args = arguments;
      return later().then(() => wFetch.apply(window, args));
    };
  });

  after(() => {
    window.fetch = wFetch;
  });


  it('Changes sorting settings', () => {
    cy.visit('/products/men');
    cy.get('span[data-test=sort-selector]', { timeout: Cypress.config('graphqlTimeout') })
      .click()
      .parent()
      .contains('Newest')
      .click();
    cy.url().should('include', '/products/men?sort=newest');
    cy.get('[data-test=spinner]')
      .should('exist');
    cy.get('[data-test=spinner]')
      .should('not.exist');
    cy.get('[data-test=product-list]')
      .first()
      .find('[data-test=product-thumbnail-name]')
      .should((e) => {
        expect(e.text()).to.include(_const.three.NAME);
      });
    cy.get('[data-test=product-list]')
      .last()
      .find('[data-test=product-thumbnail-name]')
      .should((e) => {
        expect(e.text()).to.include(_const.two.NAME);
      });

    cy.get('span[data-test=sort-selector]')
      .click()
      .parent()
      .contains('Oldest')
      .click();
    cy.get('[data-test=spinner]')
      .should('exist');
    cy.get('[data-test=spinner]')
      .should('not.exist');
    cy.url().should('include', '/products/men?sort=oldest');
    cy.get('[data-test=product-list]')
      .first()
      .find('[data-test=product-thumbnail-name]')
      .should((e) => {
        expect(e.text()).to.include(_const.one.NAME);
      });

    cy.get('[data-test=product-list]')
      .last()
      .find('[data-test=product-thumbnail-name]')
      .should((e) => {
        expect(e.text()).to.include(_const.two.NAME);
      });
  });

  it('Applies sorting settings from URL', () => {
    cy.visit('/products/men?sort=newest');
    cy.get('[data-test=spinner]')
      .should('exist');
    cy.get('[data-test=spinner]')
      .should('not.exist');
    cy.get('[data-test=product-list]')
      .first()
      .find('[data-test=product-thumbnail-name]')
      .contains(_const.three.NAME);
    cy.get('[data-test=product-list]')
      .last()
      .find('[data-test=product-thumbnail-name]')
      .contains(_const.two.NAME);
  });

  it('Displays a message when an error occurs', () => {
    cy.visit('/products/accessories-men-sunglasses');
    cy.get('[data-test=empty-results]')
      .contains('No Results Found');

    cy.get('span[data-test=sort-selector]')
      .should('not.exist');

    cy.visit('/products/unvalidCategory');
    cy.get('[data-test=category-not-found]')
      .contains('Category Not Found');
  });

  it('Paginates back and forth through product list', () => {
    cy.visit('/products/men');
    cy.get('[data-test=product-list]', { timeout: Cypress.config('graphqlTimeout') });
    cy.get('[data-test=custom-pagination-top]')
      .find('[data-test=total-pages]')
      .contains('Page 1 of 2')
      .parent()
      .find('[data-test=previous-page-link]')
      .should('be.disabled');

    cy.get('[data-test=custom-pagination-top]')
      .find('[data-test=next-page-link]')
      .click();
    cy.url().should('include', '/products/men/2');
    cy.get('[data-test=custom-pagination-top]')
      .find('[data-test=total-pages]')
      .contains('Page 2 of 2');
    cy.get('[data-test=custom-pagination-top]')
      .find('[data-test=next-page-link]')
      .should('be.disabled');

    cy.get('[data-test=custom-pagination-top]')
      .find('[data-test=previous-page-link]')
      .click();
    cy.url().should('include', '/products/men/1');
    cy.get('[data-test=custom-pagination-top]')
      .find('[data-test=total-pages]')
      .contains('Page 1 of 2');
  });
});
