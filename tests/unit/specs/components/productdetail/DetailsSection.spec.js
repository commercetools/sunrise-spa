import { shallowMount } from '@vue/test-utils';
import DetailsSection from '@/components/productdetail/DetailsSection/DetailsSection.vue';
//@todo: mock useProductQuery
describe.skip('DetailsSection/index.vue', () => {
  let product;
  let options;

  beforeEach(() => {
    product = {
      masterData: {
        current: {
          allVariants: [{
            attributesRaw: [],
          }],
        },
      },
    };

    options = {
      mocks: { $t: jest.fn() },
      propsData: { sku: 'product-sku' },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(DetailsSection, options).vm).toBeTruthy();
  });

  it('obtains attributes of the product', async () => {
    const productAttributes = [
      { attributeDefinition: { name: 'designer', label: 'label', type: 'enum' }, value: { label: 'label' } },
    ];
    product.masterData.current.allVariants[0].attributesRaw = productAttributes;
    const wrapper = shallowMount(DetailsSection, options);

    wrapper.setData({ product });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.productAttributes).toEqual([{ name: 'label', value: { label: 'label' } }]);
  });
});
