import { shallowMount } from '@vue/test-utils';
import BaseSelect from '@/components/common/form/BaseSelect.vue';

describe('BaseSelect.vue', () => {
  let options;

  beforeEach(() => {
    options = {
      propsData: {
        options: [],
        vuelidate: {
          $touch: jest.fn(),
        },
      },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(BaseSelect, options).isVueInstance()).toBeTruthy();
  });

  it('updates model with prop value', () => {
    const wrapper = shallowMount(BaseSelect, options);
    expect(wrapper.vm.model).toBeNull();

    wrapper.setProps({ value: 'some val' });
    expect(wrapper.vm.model).toBe('some val');
  });

  it('emits input changes', () => {
    const wrapper = shallowMount(BaseSelect, options);
    wrapper.setData({ model: 'some val' });
    expect(wrapper.emitted('input')[0]).toEqual(['some val']);
  });
});
