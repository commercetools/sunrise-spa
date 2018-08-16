import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ProductList from '@/components/ProductList.vue';
import ProductThumbnail from '@/components/ProductThumbnail.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ProductList.vue', () => {
  let options;

  beforeEach(() => {
    options = {
      methods: { categoryBySlug: jest.fn() },
      mocks: {
        $t: jest.fn(),
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
    const wrapper = shallowMount(ProductList, options);
    wrapper.setProps({ categorySlug: 'some-category-slug' });

    // eslint-disable-next-line no-unused-vars
    const unused = wrapper.vm.category;
    expect(options.methods.categoryBySlug).toHaveBeenCalledWith('some-category-slug');
  });

  it('calls ProductThumbnail for each obtained product', () => {
    const wrapper = shallowMount(ProductList, options);
    wrapper.setData({
      products: {
        results: [
          { id: 'product-id-1' },
          { id: 'product-id-2' },
          { id: 'product-id-3' },
        ],
      },
    });
    const thumbnails = wrapper.findAll(ProductThumbnail);

    expect(thumbnails.length).toBe(3);
    expect(thumbnails.at(0).props().product.id).toEqual('product-id-1');
    expect(thumbnails.at(1).props().product.id).toEqual('product-id-2');
    expect(thumbnails.at(2).props().product.id).toEqual('product-id-3');
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
      options.methods.categoryBySlug = () => null;
      const wrapper = shallowMount(ProductList, options);

      expect(wrapper.vm.gqlPredicate).toBeNull();
    });

    it('generates a predicate to filter by category when a category exists', () => {
      options.methods.categoryBySlug = () => ({ id: 'some-category-id' });
      const wrapper = shallowMount(ProductList, options);

      expect(wrapper.vm.gqlPredicate).toContain(filterByCategoryPredicate);
    });
  });
});
