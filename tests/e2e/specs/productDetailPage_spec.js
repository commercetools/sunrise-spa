describe('Product detail page', () => {
  const draft = {
    key: 'tshirt-for-testing',
    name: [{
      locale: 'en',
      value: 'T-shirt for testing',
    }],
    slug: [{
      locale: 'en',
      value: 't-shirt-for-testing',
    }],
    productType: {
      key: 'main',
    },
    masterVariant: {
      sku: 'sku-black-34',
      attributes: [{
        name: 'baseId',
        value: '"126"',
      },
      {
        name: 'color',
        value: '"black"',
      },
      {
        name: 'size',
        value: '"34"',
      }],
    },
    variants: [{
      sku: 'sku-black-36',
      attributes: [{
        name: 'baseId',
        value: '"463"',
      },
      {
        name: 'color',
        value: '"black"',
      },
      {
        name: 'size',
        value: '"36"',
      }],
    },
    {
      sku: 'sku-grey-30',
      attributes: [{
        name: 'baseId',
        value: '"437"',
      },
      {
        name: 'color',
        value: '"grey"',
      },
      {
        name: 'size',
        value: '"30"',
      }],
    },
    {
      sku: 'sku-grey-32',
      attributes: [{
        name: 'baseId',
        value: '"343"',
      },
      {
        name: 'color',
        value: '"grey"',
      },
      {
        name: 'size',
        value: '"32"',
      }],
    }],
  };

  before(() => {
    cy.visit('/product/lemare-booties-0778-grey/M0E20000000E0WX');
    cy.createProduct(draft);
  });

  it.skip('displays a single product details', () => {
    cy.get('[data-test=product-data]', { timeout: 20000 })
      .then(($product) => {
        cy.wrap($product)
          .find('[data-test=product-name]')
          .should('contain', 'Booties Lemare grey');

        cy.wrap($product)
          .find('[data-test=product-sku]')
          .should('contain', 'M0E20000000E0WX');

        cy.wrap($product)
          .find('[data-test=price-old-value]')
          .contains(/^\s*248,75\s€\s*$/);

        cy.wrap($product)
          .find('[data-test=price-new-value]')
          .contains(/^\s*174,12\s€\s*$/);

        cy.wrap($product)
          .find('[data-test=product-attributes-accordion]')
          .click();

        cy.wrap($product)
          .find('[data-test=product-attributes-list]')
          .should('have.length', 6)
          .eq(2)
          .contains(/^\s*size:\s+34\s*$/);
      });

    cy.get('[data-test=product-gallery]')
      .find('[data-test=product-image]')
      .should('exist');
  });

  it('changes product attributes and sku', () => {
    cy.visit('/product/t-shirt-for-testing/sku-black-34');
    cy.get('[data-test=product-data]', { timeout: 20000 })
      .then(($product) => {
        cy.wrap($product)
          .find('[data-test=product-sku]')
          .should('contain', 'sku-black-34');

        cy.wrap($product)
          .find('[data-test=attribute-select-color]')
          .select('grey');

        cy.wrap($product)
          .find('[data-test=product-sku]')
          .should('contain', 'sku-grey-30');

        cy.wrap($product)
          .find('[data-test=attribute-select-size]')
          .select('32');

        cy.wrap($product)
          .find('[data-test=product-sku]')
          .should('contain', 'sku-grey-32');

        cy.wrap($product)
          .find('[data-test=attribute-select-size]')
          .select('36');

        cy.wrap($product)
          .find('[data-test=product-sku]')
          .should('contain', 'sku-black-36');
      });
  });
});
