import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ProductList from '@/components/ProductList.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ProductList.vue', () => {
  let categoryBySlug;

  beforeEach(() => {
    categoryBySlug = jest.fn();
  });

  it('renders a vue instance', () => {
    expect(shallowMount(ProductList).isVueInstance()).toBeTruthy();
  });

  it('obtains corresponding category information', () => {
    const wrapper = shallowMount(ProductList, {
      propsData: { categorySlug: 'some-category-slug' },
      methods: { categoryBySlug },
    });

    // eslint-disable-next-line no-unused-vars
    const unused = wrapper.vm.category;
    expect(categoryBySlug).toHaveBeenCalledWith('some-category-slug');
  });

  it('calls ProductThumbnail for each obtained product', () => {
    const wrapper = shallowMount(ProductList, {
      methods: { categoryBySlug },
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

  describe('when building a GraphQL request', () => {
    const filterByCategoryPredicate = 'masterData(current(categories(id="some-category-id")))';

    it('does not generate a predicate to filter by category when category is missing ', () => {
      categoryBySlug = () => null;
      const wrapper = shallowMount(ProductList, { methods: { categoryBySlug } });

      expect(wrapper.vm.gqlPredicate).toBeNull();
    });

    it('generates a predicate to filter by category when a category exists', () => {
      categoryBySlug = () => ({ id: 'some-category-id' });
      const wrapper = shallowMount(ProductList, { methods: { categoryBySlug } });

      expect(wrapper.vm.gqlPredicate).toContain(filterByCategoryPredicate);
    });
  });
});
