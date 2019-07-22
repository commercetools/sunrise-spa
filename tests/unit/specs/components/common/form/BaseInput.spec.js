import { shallowMount } from '@vue/test-utils';
import BaseInput from '@/components/common/form/BaseInput.vue';
import BaseLabel from '@/components/common/form/BaseLabel.vue';

describe('BaseInput.vue', () => {
  let options;

  beforeEach(() => {
    options = {
      propsData: {
        vuelidate: {
          $touch: jest.fn(),
        },
      },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(BaseInput, options).isVueInstance()).toBeTruthy();
  });

  it('updates model with prop value', () => {
    const wrapper = shallowMount(BaseInput, options);
    expect(wrapper.vm.model).toBeNull();

    wrapper.setProps({ value: 'some val' });
    expect(wrapper.vm.model).toBe('some val');
  });

  it('emits input changes', () => {
    const wrapper = shallowMount(BaseInput, options);
    wrapper.find('input').setValue('some val');
    expect(wrapper.emitted('input')[0]).toEqual(['some val']);
  });

  it('nests input in label if it exists', () => {
    const wrapper = shallowMount(BaseInput, options);
    expect(wrapper.find(BaseLabel).exists()).toBeFalsy();
    expect(wrapper.findAll('input').length).toBe(1);

    wrapper.setProps({ label: 'Some label' });
    expect(wrapper.find(BaseLabel).find('input').exists()).toBeTruthy();
    expect(wrapper.findAll('input').length).toBe(1);
  });
});
