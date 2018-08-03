import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ProductList from '@/components/ProductList.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ProductList.vue', () => {
  let categoryBySlug;
  let options;

  beforeEach(() => {
    categoryBySlug = jest.fn();
    options = {
      methods: { categoryBySlug },
      mocks: {
        $apollo: {
          queries: {
            products: { loading: false },
          },
        },
      },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(ProductList, options).isVueInstance()).toBeTruthy();
  });

  it('obtains corresponding category information', () => {
    const wrapper = shallowMount(ProductList, {
      ...options,
      propsData: { categorySlug: 'some-category-slug' },
    });

    // eslint-disable-next-line no-unused-vars
    const unused = wrapper.vm.category;
    expect(categoryBySlug).toHaveBeenCalledWith('some-category-slug');
  });

  it('calls ProductThumbnail for each obtained product', () => {
    const wrapper = shallowMount(ProductList, {
      ...options,
      stubs: { ProductThumbnail: '<div data-test="product-thumbnail"/>' },
    });
    wrapper.setData({
      products: {
        results: [
          { id: 'product-id-1' },
          { id: 'product-id-2' },
          { id: 'product-id-3' },
          { id: 'product-id-4' },
        ],
      },
    });

    expect(wrapper.findAll('[data-test=product-thumbnail]').length).toBe(4);
  });

  it('detects when there are no products', () => {
    const wrapper = shallowMount(ProductList, options);
    expect(wrapper.vm.empty).toBeTruthy();
    wrapper.setData({ products: { results: [] } });
    expect(wrapper.vm.empty).toBeTruthy();
    wrapper.setData({ products: { results: [{}] } });
    expect(wrapper.vm.empty).toBeFalsy();
  });

  describe('when building a GraphQL request', () => {
    const filterByCategoryPredicate = 'masterData(current(categories(id="some-category-id")))';

    it('does not generate a predicate to filter by category when category is missing ', () => {
      const wrapper = shallowMount(ProductList, {
        ...options,
        methods: { categoryBySlug: () => null },
      });

      expect(wrapper.vm.gqlPredicate).toBeNull();
    });

    it('generates a predicate to filter by category when a category exists', () => {
      const wrapper = shallowMount(ProductList, {
        ...options,
        methods: { categoryBySlug: () => ({ id: 'some-category-id' }) },
      });

      expect(wrapper.vm.gqlPredicate).toContain(filterByCategoryPredicate);
    });
  });
});
