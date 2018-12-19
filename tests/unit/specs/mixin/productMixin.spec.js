import productMixin from '@/mixins/productMixin';

describe('productMixin', () => {
  describe('Given that a product exists with current projection', () => {
    const product = {
      product: {
        masterData: {
          current: {
            foo: 'bar',
          },
        },
      },
    };

    Object.assign(productMixin.computed, product);

    it('Obtains the current version of the product', () => {
      expect(productMixin.computed.currentProduct()).toBeTruthy();
    });
  });

  describe('Given that a product with an empty matching variant exists', () => {
    const originalPrice = {
      value: {
        centAmount: 1200,
        fractionDigit: 2,
      },
    };

    const discountedPrice = {
      discounted: {
        value: {
          centAmount: 1000,
          fractionDigits: 2,
        },
      },
    };

    const product = {
      matchingVariant: {},
    };

    Object.assign(productMixin.computed, product);

    it('Obtains whether product has a Price', () => {
      expect(productMixin.computed.hasPrice()).toBeFalsy();

      product.matchingVariant.price = { ...originalPrice };
      expect(productMixin.computed.hasPrice()).toBeTruthy();
    });

    it('Obtains whether product has a discount', () => {
      product.matchingVariant.price = { ...originalPrice };
      expect(productMixin.computed.hasDiscount()).toBeFalsy();

      product.matchingVariant.price = { ...discountedPrice };
      expect(productMixin.computed.hasDiscount()).toBeTruthy();
    });

    it('obtains the discounted price', () => {
      product.matchingVariant.price = { ...discountedPrice };
      expect(productMixin.computed.discountedPrice()).toBeTruthy();
    });

    it('obtains the original price', () => {
      product.matchingVariant.price = { ...originalPrice };
      expect(productMixin.computed.originalPrice()).toBeTruthy();
    });
  });
});

