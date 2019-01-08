import { shallowMount } from '@vue/test-utils';
import DetailsSection from '@/components/productdetail/DetailsSection.vue';

describe('DetailsSection.vue', () => {
  let product;
  let options;

  beforeEach(() => {
    product = {
      masterData: {
        current: {
          variant: {
            attributes: {},
          },
        },
      },
    };

    options = {
      mocks: { $t: jest.fn() },
      propsData: { sku: 'product-sku' },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(DetailsSection, options).isVueInstance()).toBeTruthy();
  });

  it('obtains attributes of the product', () => {
    const productAttributes = [{ foo: 'bar' }, { bar: 'foo' }];
    product.masterData.current.variant.attributes = productAttributes;
    const wrapper = shallowMount(DetailsSection, options);

    wrapper.setData({ product });
    expect(wrapper.vm.productAttributes).toEqual(productAttributes);
  });
});
