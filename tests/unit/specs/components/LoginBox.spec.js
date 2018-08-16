import Vuex from 'vuex';
import Vuelidate from 'vuelidate';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { ApolloError } from 'apollo-client';
import LoginBox from '@/components/LoginBox.vue';
import ServerError from '@/components/ServerError.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuelidate);

function setInputValue(input, value) {
  input.setValue(value);
  input.trigger('change');
  input.trigger('blur');
}

describe('LoginBox.vue', () => {
  const credentials = {
    email: 'willy.wonka@commercetools.com',
    password: 'p@ssword',
  };

  let options;
  let actions;

  beforeEach(() => {
    actions = { login: jest.fn() };
    options = {
      localVue,
      store: new Vuex.Store({ actions }),
      mocks: {
        $t: jest.fn(),
      },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(LoginBox, options).isVueInstance()).toBeTruthy();
  });

  it('builds a correct credentials object', () => {
    const wrapper = shallowMount(LoginBox, options);
    expect(wrapper.vm.credentials).toEqual({ email: null, password: null });

    setInputValue(wrapper.find('[data-test="login-form-email"]'), credentials.email);
    expect(wrapper.vm.credentials).toEqual({ email: credentials.email, password: null });

    setInputValue(wrapper.find('[data-test="login-form-password"]'), credentials.password);
    expect(wrapper.vm.credentials).toEqual({ email: credentials.email, password: credentials.password });
  });

  it('logs in when form is valid', () => {
    const wrapper = shallowMount(LoginBox, options);
    const form = wrapper.find('form');
    form.trigger('submit');
    expect(actions.login).not.toHaveBeenCalled();

    setInputValue(wrapper.find('[data-test="login-form-email"]'), credentials.email);
    form.trigger('submit');
    expect(actions.login).not.toHaveBeenCalled();

    setInputValue(wrapper.find('[data-test="login-form-password"]'), credentials.password);
    form.trigger('submit');
    expect(actions.login).toHaveBeenCalledWith(expect.anything(), credentials, undefined);
  });

  it('shows form errors', () => {
    const wrapper = shallowMount(LoginBox, options);
    expect(wrapper.find('[data-test="login-form-email-errors"]').exists()).toBeFalsy();
    expect(wrapper.find('[data-test="login-form-password-errors"]').exists()).toBeFalsy();

    wrapper.vm.login();
    wrapper.vm.$forceUpdate();
    expect(wrapper.find('[data-test="login-form-email-errors"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="login-form-password-errors"]').exists()).toBeTruthy();

    setInputValue(wrapper.find('[data-test="login-form-email"]'), credentials.email);
    expect(wrapper.find('[data-test="login-form-email-errors"]').exists()).toBeFalsy();
    expect(wrapper.find('[data-test="login-form-password-errors"]').exists()).toBeTruthy();

    setInputValue(wrapper.find('[data-test="login-form-password"]'), credentials.password);
    expect(wrapper.find('[data-test="login-form-email-errors"]').exists()).toBeFalsy();
    expect(wrapper.find('[data-test="login-form-password-errors"]').exists()).toBeFalsy();
  });

  it('catches server errors', () => {
    const wrapper = shallowMount(LoginBox, options);
    expect(wrapper.find(ServerError).props().error).toBeNull();

    const error = new ApolloError({
      graphQLErrors: [{ code: 'Error1' }, { code: 'Error2' }],
    });
    actions.login.mockRejectedValue(error);
    setInputValue(wrapper.find('[data-test="login-form-email"]'), credentials.email);
    setInputValue(wrapper.find('[data-test="login-form-password"]'), credentials.password);
    wrapper.vm.login().then(() => {
      expect(wrapper.find(ServerError).props().error).toEqual(error);
    });
  });
});
