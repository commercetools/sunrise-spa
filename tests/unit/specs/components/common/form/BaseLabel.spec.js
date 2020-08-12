import { shallowMount } from '@vue/test-utils';
import BaseLabel from '@/components/common/form/BaseLabel/BaseLabel.vue';

describe('BaseLabel/index.vue', () => {
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
    expect(shallowMount(BaseLabel, options).vm).toBeTruthy();
  });

  it('shows required on validation required', async () => {
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
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.required).toBeTruthy();
    expect(wrapper.find('[data-test="form-label-required"]').exists()).toBeFalsy();

    wrapper.setProps({ label: 'Some label' });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.required).toBeTruthy();
    expect(wrapper.find('[data-test="form-label-required"]').exists()).toBeTruthy();
  });

  it('displays label text if it exists', async () => {
    const wrapper = shallowMount(BaseLabel, options);
    expect(wrapper.find('[data-test="form-label-text"]').exists()).toBeFalsy();

    wrapper.setProps({ label: 'Some label' });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('[data-test="form-label-text"]').text()).toBe('Some label');
  });
});
