import { shallowMount } from '@vue/test-utils';
import ProductInfo from '@/components/ProductInfo.vue';

describe('ProductInfo.vue', () => {
  const originalPrice = {
    value: {
      centAmount: 1200,
      fractionDigits: 2,
    },
  };

  const discountedPrice = {
    discounted: {
      value: {
        centAmount: 1000,
        fractionDigits: 2,
      },
    },
  };

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

  it('obtains current version of the product', () => {
    const current = { foo: 'bar' };
    product.masterData.current = current;
    const wrapper = shallowMount(ProductInfo, options);

    wrapper.setData({ product });
    expect(wrapper.vm.currentProduct).toEqual(current);
  });

  it('obtains matching variant of the product', () => {
    const matchingVariant = { foo: 'bar' };
    product.masterData.current.variant = matchingVariant;
    const wrapper = shallowMount(ProductInfo, options);

    wrapper.setData({ product });
    expect(wrapper.vm.matchingVariant).toEqual(matchingVariant);
  });

  it('obtains whether product has a price', () => {
    const wrapper = shallowMount(ProductInfo, options);
    wrapper.setData({ product });
    expect(wrapper.vm.hasPrice).toBeFalsy();

    product.masterData.current.variant = { price: originalPrice };
    wrapper.setData({ product: { ...product } });
    expect(wrapper.vm.hasPrice).toBeTruthy();
  });

  it('obtains whether product has a discount', () => {
    product.masterData.current.variant.price = originalPrice;
    const wrapper = shallowMount(ProductInfo, options);
    wrapper.setData({ product });
    expect(wrapper.vm.hasDiscount).toBeFalsy();

    product.masterData.current.variant.price = discountedPrice;
    wrapper.setData({ product: { ...product } });
    expect(wrapper.vm.hasDiscount).toBeTruthy();
  });

  it('obtains the discounted price', () => {
    product.masterData.current.variant.price = discountedPrice;
    const wrapper = shallowMount(ProductInfo, options);
    wrapper.setData({ product });

    expect(wrapper.vm.discountedPrice).toBeTruthy();
  });

  it('obtains the original price', () => {
    product.masterData.current.variant.price = originalPrice;
    const wrapper = shallowMount(ProductInfo, options);
    wrapper.setData({ product });

    expect(wrapper.vm.originalPrice).toBeTruthy();
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
