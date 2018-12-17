import Vuelidate from 'vuelidate';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { ApolloError } from 'apollo-client';
import LoginForm from '@/components/LoginForm.vue';
import ServerError from '@/components/ServerError.vue';
import ValidationError from '@/components/ValidationError.vue';

jest.mock('@/auth', () => ({ clientLogin: jest.fn() }));

const localVue = createLocalVue();
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

  beforeEach(() => {
    options = {
      localVue,
      mocks: { $t: jest.fn() },
      methods: { customerSignMeIn: jest.fn() },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(LoginForm, options).isVueInstance()).toBeTruthy();
  });

  it('logs in when form is valid', () => {
    const wrapper = shallowMount(LoginForm, options);
    wrapper.vm.submit();
    expect(options.methods.customerSignMeIn).not.toHaveBeenCalled();

    setInputValue(wrapper.find('[data-test="login-form-email"]'), credentials.email);
    wrapper.vm.submit();
    expect(options.methods.customerSignMeIn).not.toHaveBeenCalled();

    fillForm(wrapper, credentials);
    wrapper.vm.submit();
    expect(options.methods.customerSignMeIn).toHaveBeenCalled();
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
    options.methods.customerSignMeIn.mockRejectedValue(error);
    fillForm(wrapper, credentials);
    wrapper.vm.submit().then(() => {
      expect(wrapper.find(ServerError).props().error).toEqual(error);
    });
  });
});
