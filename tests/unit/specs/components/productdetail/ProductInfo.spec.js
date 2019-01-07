import { shallowMount } from '@vue/test-utils';
import ProductInfo from '@/components/productdetail/ProductInfo.vue';

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
      methods: { formatPrice: jest.fn() },
      mocks: {
        $t: jest.fn(),
        $apollo: {
          queries: {
            product: { loading: false },
          },
        },
      },
      propsData: { product },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(ProductInfo, options).isVueInstance()).toBeTruthy();
  });

  it('obtains matching variant of the product', () => {
    const matchingVariant = { foo: 'bar' };
    product.masterData.current.variant = matchingVariant;
    const wrapper = shallowMount(ProductInfo, options);

    wrapper.setData({ product });
    expect(wrapper.vm.matchingVariant).toEqual(matchingVariant);
  });

  it('obtains attributes of the product', () => {
    const productAttributes = [{ foo: 'bar' }, { bar: 'foo' }];
    product.masterData.current.variant.attributes = productAttributes;
    const wrapper = shallowMount(ProductInfo, options);

    wrapper.setData({ product });
    expect(wrapper.vm.productAttributes).toEqual(productAttributes);
  });

  it('obtains images of the product', () => {
    product.masterData.current.variant.images = [{}, {}];
    const wrapper = shallowMount(ProductInfo, options);
    wrapper.setData({ product });
    expect(wrapper.vm.images).toBeTruthy();
  });
});
