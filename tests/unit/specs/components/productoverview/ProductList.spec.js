import { shallowMount } from '@vue/test-utils';
import ProductList from '@/components/productoverview/ProductList.vue';
import ProductThumbnail from '@/components/common/ProductThumbnail.vue';

describe('ProductList.vue', () => {
  let options;

  beforeEach(() => {
    options = {
      mocks: {
        $t: jest.fn(),
      },
      computed: {
        isLoading: jest.fn(),
      },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(ProductList, options).isVueInstance()).toBeTruthy();
  });

  it('obtains category information', () => {
    const wrapper = shallowMount(ProductList, options);
    wrapper.setData({
      categories: {
        results: [],
      },
    });
    expect(wrapper.vm.category).toBeUndefined();

    wrapper.setData({
      categories: {
        results: [{ id: 'category-id-1' }],
      },
    });
    expect(wrapper.vm.category).toEqual({ id: 'category-id-1' });
  });

  it('calls ProductThumbnail for each obtained product', () => {
    const wrapper = shallowMount(ProductList, options);
    wrapper.setData({
      categories: {
        results: [{ id: 'category-id-1' }],
      },
      products: {
        results: [],
      },
    });

    expect(wrapper.vm.ProductThumbnail).toBeUndefined();

    wrapper.setData({
      categories: {
        results: [{ id: 'category-id-1' }],
      },
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
});
