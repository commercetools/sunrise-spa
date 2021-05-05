import { shallowMount } from '@vue/test-utils';
import ProductGallery from '@/components/productdetail/ProductGallery/ProductGallery.vue';
//@todo: mock useProductQuery
describe.skip('Product gallery', () => {
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
    expect(shallowMount(ProductGallery, options).vm).toBeTruthy();
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

    });
  });

  describe('in order to obtain the number of thumbnails', () => {
    it('returns 0 when there are no images', () => {
      options.computed = { productImages: jest.fn(() => []) };
      const wrapper = shallowMount(ProductGallery, options);
      expect(wrapper.vm.galleryThumbnailsCount).toEqual(0);
    });

    it('returns the images count', () => {
      options.computed = { productImages: jest.fn(() => [{}, {}]) };
      const wrapper = shallowMount(ProductGallery, options);
      expect(wrapper.vm.galleryThumbnailsCount).toEqual(2);
    });

    it('returns 3 when there is more than 3 images', () => {
      options.computed = { productImages: jest.fn(() => [{}, {}, {}, {}, {}]) };
      const wrapper = shallowMount(ProductGallery, options);
      expect(wrapper.vm.galleryThumbnailsCount).toEqual(3);
    });
  });

  it('does not fail when there are no images', () => {
    options.computed = { productImages: jest.fn(() => []) };
    const wrapper = shallowMount(ProductGallery, options);
    expect(wrapper.vm.zoomerImages).toEqual({ normal_size: [], thumbs: [] });
  });
});
