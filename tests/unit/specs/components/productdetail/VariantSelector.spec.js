import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import VariantSelector from '@/components/productdetail/VariantSelector/VariantSelector.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('VariantSelector/index.vue', () => {
  let options;
  let product;

  beforeEach(() => {
    product = {
      id: '695b68e0-fb4b-4384-997a-1db12439b453',
      masterData: {
        current: {
          allVariants: [
            {
              sku: 'M0E20000000EEWT',
              attributesRaw: [
                {
                  attributeDefinition: {
                    name: 'size',
                    label: 'Size',
                    type: {
                      name: 'text',
                      __typename: 'TextAttributeDefinitionType',
                    },
                    __typename: 'AttributeDefinition',
                  },
                  value: '0',
                  __typename: 'RawProductAttribute',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              sku: 'M0E20000000EEWU',
              attributesRaw: [
                {
                  attributeDefinition: {
                    name: 'size',
                    label: 'Size',
                    type: {
                      name: 'text',
                      __typename: 'TextAttributeDefinitionType',
                    },
                    __typename: 'AttributeDefinition',
                  },
                  value: '1',
                  __typename: 'RawProductAttribute',
                },
              ],
              __typename: 'ProductVariant',
            },
            {
              sku: 'M0E20000000EEWV',
              attributesRaw: [
                {
                  attributeDefinition: {
                    name: 'size',
                    label: 'Size',
                    type: {
                      name: 'text',
                      __typename: 'TextAttributeDefinitionType',
                    },
                    __typename: 'AttributeDefinition',
                  },
                  value: '2',
                  __typename: 'RawProductAttribute',
                },

              ],
              __typename: 'ProductVariant',
            },
          ],
        },
      },
    };

    options = {
      router,
      localVue,
      propsData: {
        sku: 'M0E20000000EEWT',
      },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(VariantSelector, options).vm).toBeTruthy();
  });

  it('groups values by their attributes', () => {
    const attrs = [['Size', 'size', ['0', '1', '2']]];
    const wrapper = shallowMount(VariantSelector, options);
    wrapper.setData({ product });
    expect(wrapper.vm.attributes).toEqual(attrs);
  });

  it('calculates the selected value', () => {
    const wrapper = shallowMount(VariantSelector, options);
    wrapper.setData({ product });
    expect(wrapper.vm.selected).toEqual({ size: '0', sku: 'M0E20000000EEWT' });
  });

  it('obtains variant combinations', () => {
    const combi = [
      { size: '0', sku: 'M0E20000000EEWT' },
      { size: '1', sku: 'M0E20000000EEWU' },
      { size: '2', sku: 'M0E20000000EEWV' },
    ];
    const wrapper = shallowMount(VariantSelector, options);
    wrapper.setData({ product });
    expect(wrapper.vm.variantCombinations).toEqual(combi);
  });
});
