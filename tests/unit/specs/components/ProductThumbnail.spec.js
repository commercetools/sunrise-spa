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
  let options;

  beforeEach(() => {
    product = {
      masterData: {
        current: {
          masterVariant: {},
        },
      },
    };
    options = {
      methods: { formatPrice: jest.fn() },
      mocks: { $t: jest.fn() },
      propsData: { product },
      stubs: { 'router-link': '<a/>' },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(ProductThumbnail, options).isVueInstance()).toBeTruthy();
  });

  it('obtains current version of the product', () => {
    const current = { foo: 'bar' };
    options.propsData.product.masterData.current = current;
    const wrapper = shallowMount(ProductThumbnail, options);

    expect(wrapper.vm.currentProduct).toEqual(current);
  });

  it.skip('obtains matching variant of the product', () => {
    const matchingVariant = { foo: 'bar' };
    options.propsData.product.masterData.current.masterVariant = matchingVariant;
    const wrapper = shallowMount(ProductThumbnail, options);

    expect(wrapper.vm.matchingVariant).toEqual(matchingVariant);
  });

  it.skip('obtains whether product has more colors', () => {
    const wrapper = shallowMount(ProductThumbnail, options);
    expect(wrapper.vm.hasMoreColors).toBeFalsy();
  });

  it('obtains whether product has images', () => {
    const wrapper = shallowMount(ProductThumbnail, options);
    expect(wrapper.vm.hasImages).toBeFalsy();

    options.propsData.product.masterData.current.masterVariant.images = [{}, {}];
    wrapper.setProps({ product: { ...options.propsData.product } });
    expect(wrapper.vm.hasImages).toBeTruthy();

    options.propsData.product.masterData.current.masterVariant.images = [];
    wrapper.setProps({ product: { ...options.propsData.product } });
    expect(wrapper.vm.hasImages).toBeFalsy();
  });

  it('obtains whether product has a price', () => {
    const wrapper = shallowMount(ProductThumbnail, options);
    expect(wrapper.vm.hasPrice).toBeFalsy();

    options.propsData.product.masterData.current.masterVariant.price = { ...originalPrice };
    wrapper.setProps({ product: { ...options.propsData.product } });
    expect(wrapper.vm.hasPrice).toBeTruthy();
  });

  it('obtains whether product has a discount', () => {
    options.propsData.product.masterData.current.masterVariant.price = { ...originalPrice };
    const wrapper = shallowMount(ProductThumbnail, options);
    expect(wrapper.vm.hasDiscount).toBeFalsy();

    options.propsData.product.masterData.current.masterVariant.price = { ...discountedPrice, ...originalPrice };
    wrapper.setProps({ product: { ...options.propsData.product } });
    expect(wrapper.vm.hasDiscount).toBeTruthy();
  });

  it('obtains the image to be displayed', () => {
    options.propsData.product.masterData.current.masterVariant.images = [{ url: 'image1' }, { url: 'image2' }];
    const wrapper = shallowMount(ProductThumbnail, options);

    expect(wrapper.vm.displayedImage).toContain('image');
  });

  it('obtains the discounted price', () => {
    options.propsData.product.masterData.current.masterVariant.price = { ...discountedPrice, ...originalPrice };
    const wrapper = shallowMount(ProductThumbnail, options);

    expect(wrapper.vm.discountedPrice).toEqual(discountedPrice.discounted.value);
  });

  it('obtains the original price', () => {
    options.propsData.product.masterData.current.masterVariant.price = { ...discountedPrice, ...originalPrice };
    const wrapper = shallowMount(ProductThumbnail, options);

    expect(wrapper.vm.originalPrice).toEqual(originalPrice.value);
  });

  it('obtains the product slug', () => {
    const slug = { foo: 'bar' };
    options.propsData.product.masterData.current.slug = slug;
    const wrapper = shallowMount(ProductThumbnail, options);

    expect(wrapper.vm.productSlug).toEqual(slug);
  });

  it('obtains the product sku', () => {
    const sku = { foo: 'bar' };
    options.propsData.product.masterData.current.masterVariant.sku = sku;
    const wrapper = shallowMount(ProductThumbnail, options);

    expect(wrapper.vm.sku).toEqual(sku);
  });
});
