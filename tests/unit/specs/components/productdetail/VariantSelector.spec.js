import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import VariantSelector from '@/components/productdetail/VariantSelector/index.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('VariantSelector/index.vue', () => {
  let options;
  let product;

  beforeEach(() => {
    product = {
      masterData: {
        current: {
          allVariants: [
            {
              attributes: {
                color: {
                  key: 'black',
                  label: 'black',
                  name: 'color',
                },
                size: {
                  name: 'size',
                  value: '34',
                },
              },
              sku: 'sku-34-black',
            },
            {
              attributes: {
                color: {
                  key: 'grey',
                  label: 'grey',
                  name: 'color',
                },
                size: {
                  name: 'size',
                  value: '30',
                },
              },
              sku: 'sku-30-grey',
            },
          ],
        },
      },
    };

    options = {
      router,
      localVue,
      propsData: {
        sku: 'sku-34-black',
      },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(VariantSelector, options).isVueInstance()).toBeTruthy();
  });

  it('groups values by their attributes', () => {
    const attrs = {
      color: {
        name: 'color',
        values: ['black', 'grey'],
      },
      size: {
        name: 'size',
        values: ['34', '30'],
      },
    };
    const wrapper = shallowMount(VariantSelector, options);
    wrapper.setData({ product });
    expect(wrapper.vm.attributes).toEqual(attrs);
  });

  it('calculates the selected value', () => {
    const wrapper = shallowMount(VariantSelector, options);
    wrapper.setData({ product });
    expect(wrapper.vm.selected).toEqual({ sku: 'sku-34-black', color: 'black', size: '34' });
  });

  it('obtains variant combinations', () => {
    const combi = [
      { sku: 'sku-34-black', color: 'black', size: '34' },
      { sku: 'sku-30-grey', color: 'grey', size: '30' },
    ];
    const wrapper = shallowMount(VariantSelector, options);
    wrapper.setData({ product });
    expect(wrapper.vm.variantCombinations).toEqual(combi);
  });
});
