import cartMixin from '@/mixins/cartMixin';

describe('cartMixin', () => {
  it('calculates total items', () => {
    expect(cartMixin.computed.totalItems()).toBe(0);

    Object.assign(cartMixin.computed,
      {
        me: {},
      });
    expect(cartMixin.computed.totalItems()).toBe(0);

    Object.assign(cartMixin.computed,
      {
        me: {
          activeCart: {
            lineItems: [],
          },
        },
      });
    expect(cartMixin.computed.totalItems()).toBe(0);

    Object.assign(cartMixin.computed,
      {
        me: {
          activeCart: {
            lineItems: [{ quantity: 4 }],
          },
        },
      });
    expect(cartMixin.computed.totalItems()).toBe(4);

    Object.assign(cartMixin.computed,
      {
        me: {
          activeCart: {
            lineItems: [{ quantity: 4 }, { quantity: 6 }, { quantity: 2 }],
          },
        },
      });
    expect(cartMixin.computed.totalItems()).toBe(12);
  });
});
