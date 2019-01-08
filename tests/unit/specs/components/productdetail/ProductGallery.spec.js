import { shallowMount } from '@vue/test-utils';
import ProductGallery from '@/components/productdetail/ProductGallery.vue';

describe('Product gallery', () => {
  let options;
  let product;

  beforeEach(() => {
    product = {
      masterData: {
        current: {
          variant: {
            images: [
              {
                url: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/079536_1_large.jpg',
              },
              {
                url: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/079535_1_large.jpg',
              },
            ],
          },
        },
      },
    };

    options = {
      propsData: { sku: 'product-sku' },
      stubs: { ProductZoomer: true },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(ProductGallery, options).isVueInstance()).toBeTruthy();
  });

  it('tranforms product images into ProductZoomer structure', () => {
    const wrapper = shallowMount(ProductGallery, options);
    wrapper.setData({ product });
    expect(wrapper.vm.zoomerImages).toEqual({
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
    });
  });

  it('checks whether number of thumbnail is correct', () => {
    const productImagesMock = jest.fn();
    options.computed = { productImages: productImagesMock };
    const wrapper = shallowMount(ProductGallery, options);

    productImagesMock.mockReturnValueOnce([]);
    expect(wrapper.vm.galleryThumbnailsCount).toEqual(0);

    productImagesMock.mockReturnValueOnce([{}, {}]);
    expect(wrapper.vm.galleryThumbnailsCount).toEqual(2);

    productImagesMock.mockReturnValueOnce([{}, {}, {}, {}, {}]);
    expect(wrapper.vm.galleryThumbnailsCount).toEqual(3);
  });

  it('does not fail when there are no images', () => {
    const wrapper = shallowMount(ProductGallery, options);
    expect(wrapper.vm.zoomerImages).toEqual({ large_size: [], normal_size: [], thumbs: [] });
  });
});
