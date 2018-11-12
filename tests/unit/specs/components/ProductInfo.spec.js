import { shallowMount } from '@vue/test-utils';
import ProductInfo from '@/components/ProductInfo.vue';

describe('ProductInfo.vue', () => {
  let product;
  let options;

  beforeEach(() => {
    product = {
      masterData: {
        current: {
          variant: {},
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
      setData: { product },
    };
  });

  it.skip('renders a vue instance', () => {
    expect(shallowMount(ProductInfo, options).isVueInstance()).toBeTruthy();
  });

  it.skip('obtains current version of the product', () => {
    const current = { foo: 'bar' };
    product.masterData.current = current;
    const wrapper = shallowMount(ProductInfo, options);

    wrapper.setData({ product });

    expect(wrapper.vm.currentProduct).toEqual(current);
  });

  it.skip('obtains matching variant of the product', () => {
    const matchingVariant = { foo: 'bar' };
    options.propsData.product.masterData.current.masterVariant = matchingVariant;
    const wrapper = shallowMount(ProductInfo, options);

    expect(wrapper.vm.matchingVariant).toEqual(matchingVariant);
  });
});
