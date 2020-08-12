import { shallowMount } from '@vue/test-utils';
import AttributeSelect from '@/components/productdetail/AttributeSelect/AttributeSelect.vue';

describe('AttributeSelect/index.vue', () => {
  let options;

  beforeEach(() => {
    options = {
      propsData: {
        name: '',
        id: 'id',
        values: [],
        variantCombinations: [],
        selected: {},
      },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(AttributeSelect, options).vm).toBeTruthy();
  });
});
