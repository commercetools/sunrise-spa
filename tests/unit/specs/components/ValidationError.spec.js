import VueI18n from 'vue-i18n';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ValidationError from '@/components/ValidationError.vue';

const localVue = createLocalVue();
localVue.use(VueI18n);

describe('ValidationError.vue', () => {
  const unknownValidationTranslation = 'unknown validation';
  const requiredTranslation = 'required error';

  let options;

  beforeEach(() => {
    options = {
      localVue,
      i18n: new VueI18n({
        locale: 'en',
        messages: {
          en: {
            unknownValidation: unknownValidationTranslation,
            required: requiredTranslation,
            params: 'min {min} max {max}',
          },
        },
      }),
      propsData: {
        vuelidate: { $params: {} },
      },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(ValidationError, options).isVueInstance()).toBeTruthy();
  });

  it('returns validations', () => {
    const wrapper = shallowMount(ValidationError, options);
    expect(wrapper.vm.validations).toEqual([]);

    wrapper.setProps({
      vuelidate: {
        $params: {
          error1: {},
          error2: {},
          error3: {},
        },
      },
    });
    expect(wrapper.vm.validations).toEqual(['error1', 'error2', 'error3']);
  });

  it('uses custom translation if available', () => {
    const wrapper = shallowMount(ValidationError, options);
    wrapper.setProps({
      vuelidate: {
        $params: {
          required: { type: 'required' },
        },
      },
    });
    expect(wrapper.vm.getErrorMessage('required')).toEqual(requiredTranslation);

    wrapper.setProps({
      customMessages: { required: 'custom message' },
    });
    expect(wrapper.vm.getErrorMessage('required')).toEqual('custom message');
  });

  it('returns unknown validation when no translation available', () => {
    const wrapper = shallowMount(ValidationError, options);
    wrapper.setProps({
      vuelidate: {
        $params: {
          email: { type: 'email' },
        },
      },
    });
    expect(wrapper.vm.getErrorMessage('email')).toEqual(unknownValidationTranslation);
  });

  it('passes params attributes to translation', () => {
    const wrapper = shallowMount(ValidationError, options);
    wrapper.setProps({
      vuelidate: {
        $params: {
          params: { type: 'params', min: 3, max: 5 },
        },
      },
    });
    expect(wrapper.vm.getErrorMessage('params')).toEqual('min 3 max 5');
  });

  it('does not show error if no error flag', () => {
    const wrapper = shallowMount(ValidationError, options);
    wrapper.setProps({
      vuelidate: {
        $error: false,
        $params: {},
      },
    });
    expect(wrapper.html()).toBeUndefined();

    wrapper.setProps({
      vuelidate: {
        $error: true,
        $params: {},
      },
    });
    expect(wrapper.html()).not.toBeUndefined();
  });
});
