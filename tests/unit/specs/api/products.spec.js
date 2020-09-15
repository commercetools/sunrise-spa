import products from '@/api/products';

const $route = {
  query: {
    q: 'searchText',
    sort: 'newest',
    min: 1,
    max: 2,
  },
  params: {
    categorySlug: 'category',
    locale: 'de',
  },
};
const $store = {
  state: {
    currency: 'EUR',
    country: 'DE',
    customerGroup: 'customer group',
    channel: { id: 'channel' },
  },
};
const categories = { results: [{ id: 88 }] };

describe('api/products.js', () => {
  beforeEach(() => {
  });

  it('set the query for product search (paramsFromComponent)', () => {
    expect(products).toBe(products);
    expect({ x: 1 }).toEqual({ x: 1 });
    expect(
      products.paramsFromComponent({
        $route,
        $store,
        categories,
      }),
    ).toEqual({
      category: 88,
      currency: 'EUR',
      country: 'DE',
      customerGroup: 'customer group',
      priceChannel: 'channel',
      loc: 'de',
      searchText: { 'text.de': 'searchText' },
      sort: { sort: 'lastModifiedAt desc' },
      priceFilter:
       { priceFilter: 'variants.scopedPrice.value.centAmount: range (100 to 200)' },
    });
    const newState = { ...$store.state };
    const newStore = { ...$store };
    delete newState.customerGroup;
    delete newState.channel;
    newStore.state = newState;
    const newRoute = { ...$route };
    const newParams = { ...$route.params };
    newParams.categorySlug = 'all';
    newRoute.query = {};
    newRoute.params = newParams;
    expect(
      products.paramsFromComponent({
        $route: newRoute,
        $store: newStore,
        categories,
      }),
    ).toEqual({
      category: undefined,
      currency: 'EUR',
      country: 'DE',
      customerGroup: undefined,
      priceChannel: undefined,
      loc: 'de',
      searchText: { },
      sort: { },
      priceFilter:
       { priceFilter: 'variants.scopedPrice.value.centAmount: range (0 to 100000000)' },
    });
  });
});
