import { shallowMount } from '@vue/test-utils';
import BaseLabel from '@/components/common/form/BaseLabel.vue';

describe('BaseLabel.vue', () => {
  let options;

  beforeEach(() => {
    options = {
      mocks: { $t: jest.fn() },
      propsData: {
        vuelidate: {},
      },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(BaseLabel, options).isVueInstance()).toBeTruthy();
  });

  it('shows required on validation required', () => {
    const wrapper = shallowMount(BaseLabel, options);
    expect(wrapper.vm.required).toBeFalsy();
    expect(wrapper.find('[data-test="form-label-required"]').exists()).toBeFalsy();

    wrapper.setProps({
      vuelidate: {
        $params: {
          required: {
            type: 'required',
          },
        },
      },
    });
    expect(wrapper.vm.required).toBeTruthy();
    expect(wrapper.find('[data-test="form-label-required"]').exists()).toBeFalsy();

    wrapper.setProps({ label: 'Some label' });
    expect(wrapper.vm.required).toBeTruthy();
    expect(wrapper.find('[data-test="form-label-required"]').exists()).toBeTruthy();
  });

  it('displays label text if it exists', () => {
    const wrapper = shallowMount(BaseLabel, options);
    expect(wrapper.find('[data-test="form-label-text"]').exists()).toBeFalsy();

    wrapper.setProps({ label: 'Some label' });
    expect(wrapper.find('[data-test="form-label-text"]').text()).toBe('Some label');
  });
});
