import { shallowMount } from '@vue/test-utils';
import ProductThumbnail from '@/components/common/ProductThumbnail/ProductThumbnail.vue';

describe('ProductThumbnail/index.vue', () => {
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
});
