import { shallowMount } from '@vue/test-utils';
import ProductThumbnail from '@/components/ProductThumbnail.vue';

describe('ProductThumbnail.vue', () => {
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
  let formatPrice;
  let options;

  beforeEach(() => {
    product = {
      masterData: {
        current: {
          masterVariant: {},
        },
      },
    };
    formatPrice = jest.fn();
    options = {
      propsData: { product },
      methods: { formatPrice },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(ProductThumbnail, options).isVueInstance()).toBeTruthy();
  });

  it('obtains current version of the product', () => {
    const current = { foo: 'bar' };
    product.masterData.current = current;
    const wrapper = shallowMount(ProductThumbnail, {
      ...options,
      propsData: { product },
    });

    expect(wrapper.vm.currentProduct).toEqual(current);
  });

  it.skip('obtains matching variant of the product', () => {
    const matchingVariant = { foo: 'bar' };
    product.masterData.current.masterVariant = matchingVariant;
    const wrapper = shallowMount(ProductThumbnail, {
      ...options,
      propsData: { product },
    });

    expect(wrapper.vm.matchingVariant).toEqual(matchingVariant);
  });

  it.skip('obtains whether product has more colors', () => {
    const wrapper = shallowMount(ProductThumbnail, {
      ...options,
      propsData: { product },
    });

    expect(wrapper.vm.hasMoreColors).toBeFalsy();
  });

  it('obtains whether product has images', () => {
    const wrapper = shallowMount(ProductThumbnail, {
      ...options,
      propsData: { product },
    });

    expect(wrapper.vm.hasImages).toBeFalsy();

    product.masterData.current.masterVariant.images = [{}, {}];
    wrapper.setProps({
      product: { ...product },
    });
    expect(wrapper.vm.hasImages).toBeTruthy();

    product.masterData.current.masterVariant.images = [];
    wrapper.setProps({
      product: { ...product },
    });
    expect(wrapper.vm.hasImages).toBeFalsy();
  });

  it('obtains whether product has a price', () => {
    const wrapper = shallowMount(ProductThumbnail, {
      ...options,
      propsData: { product },
    });

    expect(wrapper.vm.hasPrice).toBeFalsy();

    product.masterData.current.masterVariant.price = { ...originalPrice };
    wrapper.setProps({
      product: { ...product },
    });
    expect(wrapper.vm.hasPrice).toBeTruthy();
  });

  it('obtains whether product has a discount', () => {
    product.masterData.current.masterVariant.price = { ...originalPrice };
    const wrapper = shallowMount(ProductThumbnail, {
      ...options,
      propsData: { product },
    });

    expect(wrapper.vm.hasDiscount).toBeFalsy();

    product.masterData.current.masterVariant.price = { ...discountedPrice, ...originalPrice };
    wrapper.setProps({
      product: { ...product },
    });
    expect(wrapper.vm.hasDiscount).toBeTruthy();
  });

  it('obtains the image to be displayed', () => {
    product.masterData.current.masterVariant.images = [{ url: 'image1' }, { url: 'image2' }];
    const wrapper = shallowMount(ProductThumbnail, {
      ...options,
      propsData: { product },
    });

    expect(wrapper.vm.displayedImage).toContain('image');
  });

  it('obtains the discounted price', () => {
    product.masterData.current.masterVariant.price = { ...discountedPrice, ...originalPrice };
    const wrapper = shallowMount(ProductThumbnail, {
      ...options,
      propsData: { product },
    });

    expect(wrapper.vm.discountedPrice).toEqual(discountedPrice.discounted.value);
  });

  it('obtains the original price', () => {
    product.masterData.current.masterVariant.price = { ...discountedPrice, ...originalPrice };
    const wrapper = shallowMount(ProductThumbnail, {
      ...options,
      propsData: { product },
    });

    expect(wrapper.vm.originalPrice).toEqual(originalPrice.value);
  });
});
