import { shallowMount } from '@vue/test-utils';
import AttributeSelect from '@/components/productdetail/AttributeSelect.vue';

describe('AttributeSelect.vue', () => {
  let options;

  beforeEach(() => {
    options = {
      propsData: {
        name: '',
        values: [],
        variantCombinations: [],
        selected: {},
      },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(AttributeSelect, options).isVueInstance()).toBeTruthy();
  });

  it('filters out repeated values and returns the unique ones', () => {
    const wrapper = shallowMount(AttributeSelect, options);
    wrapper.setProps({ values: ['black', 'black', 'grey', 'grey'] });
    expect(wrapper.vm.distinctValues).toEqual(new Set(['black', 'grey']));
  });

  describe('we have variant combinations and selected combination', () => {
    beforeEach(() => {
      options = {
        propsData: {
          name: 'size',
          variantCombinations:
          [
            { sku: 'sku-34-black', color: 'black', size: '34' },
            { sku: 'sku-36-black', color: 'black', size: '36' },
            { sku: 'sku-30-grey', color: 'grey', size: '30' },
            { sku: 'sku-32-grey', color: 'grey', size: '32' },
          ],
          selected: { sku: 'sku-30-grey', color: 'grey', size: '30' },
          values: [],
        },
      };
    });

    it('finds the exact combination for the selected attribute', () => {
      const wrapper = shallowMount(AttributeSelect, options);
      expect(wrapper.vm.findSelectedSku('32')).toBe('sku-32-grey');
    });

    it('finds a fallback for the selected combination', () => {
      const wrapper = shallowMount(AttributeSelect, options);
      expect(wrapper.vm.findSelectedSku('34')).toBe('sku-34-black');
    });
  });
});
