import { shallowMount } from '@vue/test-utils';
import ProductGallery from '@/components/ProductGallery.vue';

describe('Product gallery', () => {
  const productImages = [
    {
      url: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/079536_1_large.jpg',
    },
    {
      url: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/079535_1_large.jpg',
    },
  ];

  let options;

  beforeEach(() => {
    options = {
      stubs: { ProductZoomer: true },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(ProductGallery, options).isVueInstance()).toBeTruthy();
  });

  it('tranforms product images into ProductZoomer structure', () => {
    const images = {
      thumbs: [
        {
          id: 0,
          url: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/079536_1_large.jpg',
        },
        {
          id: 1,
          url: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/079535_1_large.jpg',
        },
      ],

      normal_size: [
        {
          id: 0,
          url: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/079536_1_large.jpg',
        },
        {
          id: 1,
          url: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/079535_1_large.jpg',
        },
      ],

      large_size: [
        {
          id: 0,
          url: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/079536_1_large.jpg',
        },
        {
          id: 1,
          url: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/079535_1_large.jpg',
        },
      ],
    };
    const wrapper = shallowMount(ProductGallery, options);
    wrapper.setProps({ productImages });
    expect(wrapper.vm.images).toEqual(images);
  });

  it('does not fail when there are no images', () => {
    const wrapper = shallowMount(ProductGallery, options);
    expect(wrapper.vm.images).toEqual({ large_size: [], normal_size: [], thumbs: [] });
  });
});
