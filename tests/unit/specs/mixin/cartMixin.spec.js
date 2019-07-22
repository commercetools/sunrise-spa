import cartMixin from '@/mixins/cartMixin';

describe('cartMixin', () => {
  const noCart = { me: {} };
  const emptyCart = { me: { activeCart: { lineItems: [] } } };

  it('decides whether cart exists', () => {
    delete cartMixin.computed.me;
    expect(cartMixin.computed.cartExists()).toBeFalsy();

    Object.assign(cartMixin.computed, noCart);
    expect(cartMixin.computed.cartExists()).toBeFalsy();

    Object.assign(cartMixin.computed, emptyCart);
    expect(cartMixin.computed.cartExists()).toBeTruthy();
  });

  it('decides whether cart is empty', () => {
    delete cartMixin.computed.me;
    expect(cartMixin.computed.cartNotEmpty()).toBeFalsy();

    Object.assign(cartMixin.computed, noCart);
    expect(cartMixin.computed.cartNotEmpty()).toBeFalsy();

    Object.assign(cartMixin.computed, emptyCart);
    expect(cartMixin.computed.cartNotEmpty()).toBeFalsy();

    const cartWithItems = { me: { activeCart: { lineItems: [{}] } } };
    Object.assign(cartMixin.computed, cartWithItems);
    expect(cartMixin.computed.cartNotEmpty()).toBeTruthy();
  });

  it('calculates total items', () => {
    delete cartMixin.computed.me;
    expect(cartMixin.computed.totalItems()).toBe(0);

    Object.assign(cartMixin.computed, noCart);
    expect(cartMixin.computed.totalItems()).toBe(0);

    Object.assign(cartMixin.computed, emptyCart);
    expect(cartMixin.computed.totalItems()).toBe(0);

    const cartWithItems = { me: { activeCart: { lineItems: [] } } };
    cartWithItems.me.activeCart.lineItems.push({ quantity: 4 });
    Object.assign(cartMixin.computed, cartWithItems);
    expect(cartMixin.computed.totalItems()).toBe(4);

    cartWithItems.me.activeCart.lineItems.push({ quantity: 6 });
    cartWithItems.me.activeCart.lineItems.push({ quantity: 2 });
    Object.assign(cartMixin.computed, cartWithItems);
    expect(cartMixin.computed.totalItems()).toBe(12);
  });

  it('sorts line items', () => {
    delete cartMixin.computed.me;
    Object.assign(cartMixin.computed, noCart);
    expect(cartMixin.computed.sortedLineItems()).toEqual([]);

    const cartWithItems = { me: { activeCart: { lineItems: [] } } };
    cartWithItems.me.activeCart.lineItems.push({ id: 'id1' });
    Object.assign(cartMixin.computed, cartWithItems);
    expect(cartMixin.computed.sortedLineItems()).toEqual([{ id: 'id1' }]);

    cartWithItems.me.activeCart.lineItems.push({ id: 'id2' });
    cartWithItems.me.activeCart.lineItems.push({ id: 'id3' });
    Object.assign(cartMixin.computed, cartWithItems);
    expect(cartMixin.computed.sortedLineItems()).toEqual([
      { id: 'id3' },
      { id: 'id2' },
      { id: 'id1' },
    ]);
  });
});
