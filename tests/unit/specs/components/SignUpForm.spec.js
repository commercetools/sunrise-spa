import Vuex from 'vuex';
import Vuelidate from 'vuelidate';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { ApolloError } from 'apollo-client';
import SignUpForm from '@/components/SignUpForm.vue';
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
  let actions;

  beforeEach(() => {
    actions = { signup: jest.fn() };
    options = {
      localVue,
      store: new Vuex.Store({ actions }),
      mocks: {
        $t: jest.fn(),
      },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(SignUpForm, options).isVueInstance()).toBeTruthy();
  });

  it('builds a correct customer draft object', () => {
    const wrapper = shallowMount(SignUpForm, options);
    expect(wrapper.vm.customerDraft).toEqual({
      firstName: null, lastName: null, email: null, password: null,
    });

    setInputValue(wrapper.find('[data-test="signup-form-email"]'), customer.email);
    expect(wrapper.vm.customerDraft).toEqual({
      firstName: null, lastName: null, email: customer.email, password: null,
    });

    fillForm(wrapper, customer);
    expect(wrapper.vm.customerDraft).toEqual({
      firstName: customer.firstName, lastName: customer.lastName, email: customer.email, password: customer.password,
    });
  });

  it('signs up when form is valid', () => {
    const wrapper = shallowMount(SignUpForm, options);
    wrapper.vm.signup();
    expect(actions.signup).not.toHaveBeenCalled();

    setInputValue(wrapper.find('[data-test="signup-form-email"]'), customer.email);
    wrapper.vm.signup();
    expect(actions.signup).not.toHaveBeenCalled();

    fillForm(wrapper, customer);
    wrapper.vm.signup();
    expect(actions.signup).toHaveBeenCalledWith(expect.anything(), customer, undefined);
  });

  it('shows form errors', () => {
    const wrapper = shallowMount(SignUpForm, options);
    expect(wrapper.findAll(ValidationError).length).toBe(6);
  });

  it('catches server errors', () => {
    const wrapper = shallowMount(SignUpForm, options);
    expect(wrapper.find(ServerError).props().error).toBeNull();

    const error = new ApolloError({
      graphQLErrors: [{ code: 'Error1' }, { code: 'Error2' }],
    });
    actions.signup.mockRejectedValue(error);
    fillForm(wrapper, customer);
    wrapper.vm.signup().then(() => {
      expect(wrapper.find(ServerError).props().error).toEqual(error);
    });
  });
});
