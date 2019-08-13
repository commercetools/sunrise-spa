import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import VariantSelector from '@/components/productdetail/VariantSelector.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('VariantSelector.vue', () => {
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
              sku: 'sku-black-34',
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
              sku: 'sku-grey-30',
            },
          ],
        },
      },
    };

    options = {
      router,
      localVue,
      propsData: {
        sku: 'sku-black-34',
      },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(VariantSelector, options).isVueInstance()).toBeTruthy();
  });

  it('updates sku in url according to selected variants', () => {
    const wrapper = shallowMount(VariantSelector, options);
    router.push(wrapper.vm.sku);
    expect(wrapper.vm.$route.path).toEqual('/sku-black-34');

    wrapper.setProps({
      sku: 'sku-black-36',
    });
    expect(wrapper.props().sku).toBe('sku-black-36');
    router.push(wrapper.vm.sku);
    expect(wrapper.vm.$route.path).toEqual('/sku-black-36');
  });

  it('groups values by their attributes', () => {
    const attrs = {
      color: ['black', 'grey'],
      size: ['34', '30'],
    };
    const wrapper = shallowMount(VariantSelector, options);
    wrapper.setData({ product });
    expect(wrapper.vm.attributes).toEqual(attrs);
  });

  it('watches on the selected value', () => {
    const wrapper = shallowMount(VariantSelector, options);
    wrapper.setData({ product });
    expect(wrapper.vm.selected).toEqual({ sku: 'sku-black-34', color: 'black', size: '34' });
  });

  it('obtains variant combinations', () => {
    const combi = [
      { sku: 'sku-black-34', color: 'black', size: '34' },
      { sku: 'sku-grey-30', color: 'grey', size: '30' },
    ];
    const wrapper = shallowMount(VariantSelector, options);
    expect(wrapper.vm.variantCombinations).toEqual([]);

    wrapper.setData({ product });
    expect(wrapper.vm.variantCombinations).toEqual(combi);
  });
});
