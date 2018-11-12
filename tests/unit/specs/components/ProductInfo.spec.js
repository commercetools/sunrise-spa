import { shallowMount } from '@vue/test-utils';
import ProductInfo from '@/components/ProductInfo.vue';

describe('ProductInfo.vue', () => {
  let product;
  let options;

  beforeEach(() => {
    product = {
      masterData: {
        current: {
          variant: {
            images: [],
            attributes: {},
          },
        },
      },
    };

    options = {
      mocks: {
        $t: jest.fn(),
        $apollo: {
          queries: {
            product: { loading: false },
          },
        },
      },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(ProductInfo, options).isVueInstance()).toBeTruthy();
  });

  it('obtains current version of the product', () => {
    const wrapper = shallowMount(ProductInfo, options);
    wrapper.setData({ product });

    expect(wrapper.vm.currentProduct).toEqual(product.masterData.current);
  });

  it('obtains matching variant of the product', () => {
    const wrapper = shallowMount(ProductInfo, options);
    wrapper.setData({ product });

    expect(wrapper.vm.matchingVariant).toEqual(product.masterData.current.variant);
  });
});
