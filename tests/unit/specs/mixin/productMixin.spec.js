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
    const product = {
      matchingVariant: {},
    };

    Object.assign(productMixin.computed, product);

    it('Obtains whether product has a Price', () => {
      expect(productMixin.computed.hasPrice()).toBeFalsy();

      product.matchingVariant.price = {
        value: {
          centAmount: 1200,
          fractionDigit: 2,
        },
      };
      expect(productMixin.computed.hasPrice()).toBeTruthy();
    });
  });

  it('returns the first available image', () => {
    expect(productMixin.methods.displayedImageUrl({})).toBe('/assets/img/missing.svg');

    expect(productMixin.methods.displayedImageUrl({
      images: [],
    })).toBe('/assets/img/missing.svg')

    expect(productMixin.methods.displayedImageUrl({
      images: [
        { url: 'url1' },
        { url: 'url2' },
        { url: 'url3' },
      ],
    })).toBe('url1');
  });
});
