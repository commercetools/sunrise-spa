import Vuelidate from 'vuelidate';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { ApolloError } from 'apollo-client';
import SignUpForm from '@/components/login/SignUpForm.vue';
import ServerError from '@/components/common/ServerError.vue';
import ValidationError from '@/components/common/ValidationError.vue';

jest.mock('@/auth', () => ({ clientLogin: jest.fn() }));

const localVue = createLocalVue();
localVue.use(Vuelidate);

function setInputValue(input, value) {
  input.setValue(value);
  input.trigger('change');
  input.trigger('blur');
}

function fillForm(wrapper, customer) {
  setInputValue(wrapper.find('[data-test="signup-form-firstname"]'), customer.firstName);
  setInputValue(wrapper.find('[data-test="signup-form-lastname"]'), customer.lastName);
  setInputValue(wrapper.find('[data-test="signup-form-email"]'), customer.email);
  setInputValue(wrapper.find('[data-test="signup-form-password"]'), customer.password);
  setInputValue(wrapper.find('[data-test="signup-form-repeatpassword"]'), customer.password);
  wrapper.find('[data-test="signup-form-agreetoterms"]').setChecked(true);
}

describe('SignUpForm.vue', () => {
  const customer = {
    firstName: 'Willy',
    lastName: 'Wonka',
    email: 'willy.wonka@commercetools.com',
    password: 'p@ssword',
  };

  let options;

  beforeEach(() => {
    options = {
      localVue,
      mocks: { $t: jest.fn() },
      methods: { customerSignMeUp: jest.fn() },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(SignUpForm, options).isVueInstance()).toBeTruthy();
  });

  it('signs up when form is valid', () => {
    const wrapper = shallowMount(SignUpForm, options);
    wrapper.vm.submit();
    expect(options.methods.customerSignMeUp).not.toHaveBeenCalled();

    setInputValue(wrapper.find('[data-test="signup-form-email"]'), customer.email);
    wrapper.vm.submit();
    expect(options.methods.customerSignMeUp).not.toHaveBeenCalled();

    fillForm(wrapper, customer);
    wrapper.vm.submit();
    expect(options.methods.customerSignMeUp).toHaveBeenCalled();
  });

  it('shows form errors', () => {
    const wrapper = shallowMount(SignUpForm, options);
    expect(wrapper.findAll(ValidationError).length).toBe(6);
  });

  it('catches server errors', async () => {
    const wrapper = shallowMount(SignUpForm, options);
    expect(wrapper.find(ServerError).props().error).toBeNull();

    const error = new ApolloError({
      graphQLErrors: [{ code: 'Error1' }, { code: 'Error2' }],
    });
    options.methods.customerSignMeUp.mockRejectedValue(error);
    fillForm(wrapper, customer);
    await wrapper.vm.submit();
    expect(wrapper.find(ServerError).props().error).toEqual(error);
  });
});
