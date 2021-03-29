jest.mock('../../../../../src/composition/useProductQuery');
import { shallowMount } from '@vue/test-utils';
import ProductInfo from '@/components/productdetail/ProductInfo/ProductInfo.vue';
import useProductQuery from '../../../../../src/composition/useProductQuery';

describe('ProductInfo/index.vue', () => {
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
      // methods: { formatPrice: jest.fn() },
      mocks: { $t: jest.fn() },
      propsData: { sku: 'product-sku' },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(ProductInfo, options).vm).toBeTruthy();
  });

  it('obtains matching variant of the product', () => {
    const matchingVariant = { foo: 'bar' };
    product.masterData.current.variant = matchingVariant;
    useProductQuery.mockReturnValue({
      product,
      currentProduct:product.masterData.current,
      matchingVariant,
      isOnStock:true
    })
    const wrapper = shallowMount(ProductInfo, options);
    expect(wrapper.vm.matchingVariant).toEqual(matchingVariant);
  });
});
