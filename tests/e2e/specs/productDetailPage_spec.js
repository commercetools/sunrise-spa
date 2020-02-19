import _const from '../support/const';

describe('Product detail page', () => {
  const draft = {
    key: 't-shirt-for-testing',
    name: [{
      locale: 'en',
      value: 'T-shirt for testing',
    }],
    slug: [{
      locale: 'en',
      value: 't-shirt-testing',
    }],
    productType: {
      key: 'main',
    },
    masterVariant: {
      sku: 'sku-34-black',
      attributes: [{
        name: 'baseId',
        value: '"123"',
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
      sku: 'sku-36-black',
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
      sku: 'sku-30-grey',
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
      sku: 'sku-32-grey',
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

  it('displays a single product details', () => {
    cy.visit('/product/hoganrebel-r261-sneaker-6708K62AZC-grey/M0E20000000DX1Y');
    cy.get('[data-test=product-data]')
      .then(($product) => {
        cy.wrap($product)
          .find('[data-test=product-name]')
          .should('contain', _const.one.NAME);

        cy.wrap($product)
          .find('[data-test=product-sku]')
          .should((e) => {
            expect(e.text()).to.include(_const.one.sku);
          });

        cy.wrap($product)
          .find('[data-test=price-old-value]')
          .should((e) => {
            expect(e.text()).to.include(_const.one.OLD_PRICE);
          });

        cy.wrap($product)
          .find('[data-test=price-new-value]')
          .should((e) => {
            expect(e.text()).to.include(_const.one.PRICE);
          });

        cy.wrap($product)
          .find('[data-test=product-attributes-accordion]')
          .click();

        cy.wrap($product)
          .find('[data-test=product-attributes-list]')
          .should('have.length', 6)
          .eq(2)
          .should((e) => {
            expect(e.text()).to.match(/^\s*Size:\s+5\s*$/g);
          });
      });

    cy.get('[data-test=product-gallery]')
      .find('[data-test=product-image]')
      .should('exist');
  });

  it('changes product attributes and sku', () => {
    cy.addProduct(draft);
    cy.visit('/product/t-shirt-testing/sku-34-black');
    cy.get('[data-test=product-data]')
      .then(($product) => {
        cy.wrap($product)
          .find('[data-test=product-sku]')
          .should('contain', 'sku-34-black');

        cy.wrap($product)
          .find('[data-test=attribute-select-color]')
          .select('grey');

        cy.wrap($product)
          .find('[data-test=product-sku]')
          .should('contain', 'sku-30-grey');

        cy.wrap($product)
          .find('[data-test=attribute-select-size]')
          .select('32');

        cy.wrap($product)
          .find('[data-test=product-sku]')
          .should('contain', 'sku-32-grey');

        cy.wrap($product)
          .find('[data-test=attribute-select-size]')
          .select('36');

        cy.wrap($product)
          .find('[data-test=product-sku]')
          .should('contain', 'sku-36-black');
      });
  });
  it('shows correct language', async () => {
    cy.visit('/product/havaianas-flipflops-brasil-gruen/M0E20000000ELAJ');
    cy.changeLanguage('Deutsch');
    cy.get('[data-test=attribute-name]')
      .should(
        e => expect(e[1].innerText)
          .to
          .include('GRÖSSE'),
      );
    cy.get('.accordion-plus').eq(0).click();
    cy.get('[data-test=product-attributes-list]')
      .eq(2)
      .should(
        (e) => {
          expect(e[0].innerText).to.include('GRÖSSE');
        },
      );
  });
});
