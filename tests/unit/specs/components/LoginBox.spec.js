import Vuex from 'vuex';
import Vuelidate from 'vuelidate';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import LoginBox from '@/components/LoginBox.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuelidate);

function setLazyValue(input, value) {
  input.setValue(value);
  input.trigger('change');
}

describe('LoginBox.vue', () => {
  const validEmail = 'willy.wonka@commercetools.com';
  const validPassword = 'p@ssword';

  let options;
  let actions;
  let store;

  beforeEach(() => {
    actions = { login: jest.fn() };
    store = new Vuex.Store({ actions });
    options = {
      localVue,
      store,
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(LoginBox, options).isVueInstance()).toBeTruthy();
  });

  it('detects invalid credentials error', () => {
    const wrapper = shallowMount(LoginBox, options);
    expect(wrapper.vm.hasInvalidCredentialsError).toBeFalsy();

    wrapper.setData({
      serverError: {
        graphQLErrors: [{ code: 'AnError' }, { code: 'InvalidCredentials' }],
      },
    });
    expect(wrapper.vm.hasInvalidCredentialsError).toBeTruthy();

    wrapper.setData({
      serverError: {
        graphQLErrors: [{ code: 'AnError' }, { code: 'SomeOtherError' }],
      },
    });
    expect(wrapper.vm.hasInvalidCredentialsError).toBeFalsy();
  });

  it('builds a correct credentials object', () => {
    const wrapper = shallowMount(LoginBox, options);
    expect(wrapper.vm.credentials).toEqual({ email: null, password: null });

    setLazyValue(wrapper.find('input[data-test="login-form-email"]'), validEmail);
    expect(wrapper.vm.credentials).toEqual({ email: validEmail, password: null });

    setLazyValue(wrapper.find('input[data-test="login-form-password"]'), validPassword);
    expect(wrapper.vm.credentials).toEqual({ email: validEmail, password: validPassword });
  });

  it.skip('logs in', () => {
    const wrapper = shallowMount(LoginBox, options);
    wrapper.vm.login();
    expect(actions.login).not.toHaveBeenCalled();

    setLazyValue(wrapper.find('input[data-test="login-form-email"]'), validEmail);
    setLazyValue(wrapper.find('input[data-test="login-form-password"]'), validPassword);
    wrapper.vm.login();
    expect(actions.login).toHaveBeenCalled();
  });
});
