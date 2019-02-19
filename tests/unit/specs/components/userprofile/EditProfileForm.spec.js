import Vuelidate from 'vuelidate';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { ApolloError } from 'apollo-client';
import EditProfileForm from '@/components/useraccount/EditProfileForm.vue';
import ServerError from '@/components/common/ServerError.vue';
import ValidationError from '@/components/common/ValidationError.vue';

const localVue = createLocalVue();
localVue.use(Vuelidate);

function setInputValue(input, value) {
  input.setValue(value);
  input.trigger('change');
  input.trigger('blur');
}

function fillForm(wrapper, customer) {
  setInputValue(wrapper.find('[data-test="edit-profile-form-firstname"]'), customer.firstName);
  setInputValue(wrapper.find('[data-test="edit-profile-form-lastname"]'), customer.lastName);
  setInputValue(wrapper.find('[data-test="edit-profile-form-email"]'), customer.email);
}

describe('EditProfileForm.vue', () => {
  const me = {
    customer: {
      email: 'willy.wonka@commercetools.com',
      firstName: 'Willy',
      lastName: 'Wonka',
    },
  };

  const newUser = {
    email: 'hey@gmail.com',
    firstName: 'William',
    lastName: 'Wonkala',
  };

  let options;

  beforeEach(() => {
    options = {
      localVue,
      mocks: { $t: jest.fn() },
      methods: {
        updateMyCustomer: jest.fn(),
      },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(EditProfileForm, options).isVueInstance()).toBeTruthy();
  });

  it('displays current form values', () => {
    const wrapper = shallowMount(EditProfileForm, options);
    wrapper.setData({ me });
    expect(wrapper.find('[data-test="edit-profile-form-firstname"]').element.value).toBe(me.customer.firstName);
    expect(wrapper.find('[data-test="edit-profile-form-lastname"]').element.value).toBe(me.customer.lastName);
    expect(wrapper.find('[data-test="edit-profile-form-email"]').element.value).toBe(me.customer.email);
  });

  it('updates user info when one form field is valid', () => {
    const wrapper = shallowMount(EditProfileForm, options);
    wrapper.setData({ me });
    setInputValue(wrapper.find('[data-test="edit-profile-form-firstname"]'), newUser.firstName);
    wrapper.vm.submit();
    expect(options.methods.updateMyCustomer).toHaveBeenCalled();
  });

  it('updates user info when form is valid', () => {
    const wrapper = shallowMount(EditProfileForm, options);
    wrapper.setData({ me });
    fillForm(wrapper, newUser);
    wrapper.vm.submit();
    expect(options.methods.updateMyCustomer).toHaveBeenCalled();
  });

  it('does not update customer info when form is invalid', () => {
    const wrapper = shallowMount(EditProfileForm, options);
    wrapper.setData({ me });
    setInputValue(wrapper.find('[data-test="edit-profile-form-firstname"]'), '');
    wrapper.vm.submit();
    expect(options.methods.updateMyCustomer).not.toHaveBeenCalled();
  });

  it('does not update customer info when form has not changed', () => {
    const wrapper = shallowMount(EditProfileForm, options);
    wrapper.setData({ me });
    wrapper.vm.submit();
    expect(options.methods.updateMyCustomer).not.toHaveBeenCalled();
  });

  it('checks if any of form values have changed', () => {
    const wrapper = shallowMount(EditProfileForm, options);
    wrapper.setData({ me });
    expect(wrapper.vm.hasFormChanged).toBeFalsy();

    setInputValue(wrapper.find('[data-test="edit-profile-form-email"]'), newUser.email);
    expect(wrapper.vm.hasFormChanged).toBeTruthy();

    setInputValue(wrapper.find('[data-test="edit-profile-form-email"]'), me.customer.email);
    expect(wrapper.vm.hasFormChanged).toBeFalsy();
  });

  it('shows form error', () => {
    const wrapper = shallowMount(EditProfileForm, options);
    wrapper.setData({ me });
    expect(wrapper.findAll(ValidationError).length).toBe(3);
  });

  it('catches server errors', async () => {
    const wrapper = shallowMount(EditProfileForm, options);
    wrapper.setData({ me });
    expect(wrapper.find(ServerError).props().error).toBeNull();

    const error = new ApolloError({
      graphQLErrors: [{ code: 'Error1' }, { code: 'Error2' }],
    });
    options.methods.updateMyCustomer.mockRejectedValue(error);
    fillForm(wrapper, newUser);
    await wrapper.vm.submit();
    expect(wrapper.find(ServerError).props().error).toEqual(error);
  });
});
