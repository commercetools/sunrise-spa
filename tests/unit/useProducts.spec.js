import { ref } from 'vue';
import useProducts from '../../composition/ct/useProducts';
import { useQuery } from '@vue/apollo-composable';
import useCategories from '../../composition/useCategories';
jest.mock('@vue/apollo-composable', () => {
  const { ref } = require('vue');
  const result = ref({
    productProjectionSearch: {
      results: [],
    },
  });
  return {
    ...jest.requireActual('@vue/apollo-composable'),
    useQuery: jest.fn(() => {
      return { result };
    }),
  };
});
jest.mock('vue', () => {
  return {
    ...jest.requireActual('vue'),
    onMounted: jest.fn((fn) => fn()),
  };
});
jest.mock('../../composition/useCategories', () => {
  const { ref } = require('vue');
  const categories = ref([{ id: 3 }]);
  return jest.fn(() => ({ categories }));
});

const createParams = (params = {}) => ({
  locale: ref('en'),
  limit: ref(2),
  offset: ref(0),
  currency: ref('EUR'),
  country: ref('DE'),
  sorts: ref(null),
  categorySlug: ref(null),
  sku: ref(null),
  expand: {},
  ...params,
});
describe('useProducts', () => {
  it('Passes correct values to useQuery', () => {
    const params = createParams();
    useProducts(params);
    expect(useQuery.mock.calls[0][1].locale.value).toBe(
      'en'
    );
    [
      ['locale', ref('de'), 'de'],
      ['limit', ref(10), 10],
      ['offset', ref(5), 5],
      ['sorts', ref('hello'), 'hello'],
    ].forEach(([key, value, shouldBe]) => {
      useQuery.mockClear();
      useProducts({ ...createParams({ [key]: value }) });
      expect(useQuery.mock.calls[0][1][key].value).toBe(
        shouldBe
      );
    });
    const categoryCheck = ({ categorySlug, skip }) => {
      expect(skip.value).toBe(!categorySlug.value);
    };
    [
      [
        'currency',
        'USD',
        (o) => o.priceSelector.value,
        { currency: 'USD', country: 'DE' },
      ],
      [
        'country',
        'US',
        (x) => x.priceSelector.value,
        { currency: 'EUR', country: 'US' },
      ],
      [
        'categorySlug',
        'slug',
        (x) => x.filters.value,
        [
          {
            model: {
              range: {
                path: 'variants.scopedPrice.value.centAmount',
                ranges: [
                  {
                    from: '0',
                    to: '1000000000000',
                  },
                ],
              },
            },
          },
          {
            model: {
              tree: {
                path: 'categories.id',
                rootValues: [],
                subTreeValues: [3],
              },
            },
          },
        ],
      ],
      [
        'sku',
        '888',
        (x) => x.filters.value,
        [
          {
            model: {
              range: {
                path: 'variants.scopedPrice.value.centAmount',
                ranges: [
                  { from: '0', to: '1000000000000' },
                ],
              },
            },
          },
          {
            model: {
              value: {
                path: 'variants.sku',
                values: ['888'],
              },
            },
          },
        ],
      ],
    ].forEach(([key, value, getter, shouldBe]) => {
      useQuery.mockClear();
      useCategories.mockClear();
      useProducts({
        ...createParams({ [key]: ref(value) }),
      });
      categoryCheck(useCategories.mock.calls[0][0]);
      expect(getter(useQuery.mock.calls[0][1])).toEqual(
        shouldBe
      );
    });
    expect(true).toEqual(true);
  });
});
