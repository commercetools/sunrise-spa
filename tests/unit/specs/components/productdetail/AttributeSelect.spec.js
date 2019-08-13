import { shallowMount } from '@vue/test-utils';
import AttributeSelect from '@/components/productdetail/AttributeSelect.vue';

describe('AttributeSelect.vue', () => {
  let options;

  beforeEach(() => {
    options = {
      propsData: {
        product: {},
        sku: '',
        name: '',
        variantCombinations: [],
        selected: {},
        values: ['black', 'black', 'grey', 'grey'],
      },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(AttributeSelect, options).isVueInstance()).toBeTruthy();
  });

  it('filters out repeated values and returns the unique ones', () => {
    const wrapper = shallowMount(AttributeSelect, options);
    expect(wrapper.vm.distinctValues).toEqual(new Set(['black', 'grey']));
  });
});
