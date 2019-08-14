import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import VariantSelector from '@/components/productdetail/VariantSelector.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('VariantSelector.vue', () => {
  let mockedFlatMap;
  let options;
  let product;

  beforeEach(() => {
    mockedFlatMap = jest.fn();

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
      methods: { flatMap: mockedFlatMap },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(VariantSelector, options).isVueInstance()).toBeTruthy();
  });

  it('updates sku in url according to selected variants', () => {
    const wrapper = shallowMount(VariantSelector, options);
    router.push(wrapper.vm.sku);
    expect(wrapper.vm.$route.path).toEqual('/sku-34-black');

    wrapper.setProps({
      sku: 'sku-36-black',
    });
    expect(wrapper.props().sku).toBe('sku-36-black');
    router.push(wrapper.vm.sku);
    expect(wrapper.vm.$route.path).toEqual('/sku-36-black');
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
    expect(wrapper.vm.selected).toEqual({ sku: 'sku-34-black', color: 'black', size: '34' });
  });

  it('obtains variant combinations', () => {
    const combi = [
      { sku: 'sku-34-black', color: 'black', size: '34' },
      { sku: 'sku-30-grey', color: 'grey', size: '30' },
    ];
    const wrapper = shallowMount(VariantSelector, options);
    expect(wrapper.vm.variantCombinations).toEqual([]);

    wrapper.setData({ product });
    expect(wrapper.vm.variantCombinations).toEqual(combi);
  });
});
