import Vuex from 'vuex';
import Vuelidate from 'vuelidate';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { ApolloError } from 'apollo-client';
import LoginForm from '@/components/LoginForm.vue';
import ServerError from '@/components/ServerError.vue';
import ValidationError from '@/components/ValidationError.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuelidate);

function setInputValue(input, value) {
  input.setValue(value);
  input.trigger('change');
  input.trigger('blur');
}

function fillForm(wrapper, credentials) {
  setInputValue(wrapper.find('[data-test="login-form-email"]'), credentials.email);
  setInputValue(wrapper.find('[data-test="login-form-password"]'), credentials.password);
}

describe('LoginForm.vue', () => {
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
    expect(shallowMount(LoginForm, options).isVueInstance()).toBeTruthy();
  });

  it('builds a correct credentials object', () => {
    const wrapper = shallowMount(LoginForm, options);
    expect(wrapper.vm.credentials).toEqual({ email: null, password: null });

    setInputValue(wrapper.find('[data-test="login-form-email"]'), credentials.email);
    expect(wrapper.vm.credentials).toEqual({ email: credentials.email, password: null });

    fillForm(wrapper, credentials);
    expect(wrapper.vm.credentials).toEqual({ email: credentials.email, password: credentials.password });
  });

  it('logs in when form is valid', () => {
    const wrapper = shallowMount(LoginForm, options);
    wrapper.vm.login();
    expect(actions.login).not.toHaveBeenCalled();

    setInputValue(wrapper.find('[data-test="login-form-email"]'), credentials.email);
    wrapper.vm.login();
    expect(actions.login).not.toHaveBeenCalled();

    fillForm(wrapper, credentials);
    wrapper.vm.login();
    expect(actions.login).toHaveBeenCalledWith(expect.anything(), credentials, undefined);
  });

  it('shows form errors', () => {
    const wrapper = shallowMount(LoginForm, options);
    expect(wrapper.findAll(ValidationError).length).toBe(2);
  });

  it('catches server errors', () => {
    const wrapper = shallowMount(LoginForm, options);
    expect(wrapper.find(ServerError).props().error).toBeNull();

    const error = new ApolloError({
      graphQLErrors: [{ code: 'Error1' }, { code: 'Error2' }],
    });
    actions.login.mockRejectedValue(error);
    fillForm(wrapper, credentials);
    wrapper.vm.login().then(() => {
      expect(wrapper.find(ServerError).props().error).toEqual(error);
    });
  });
});
