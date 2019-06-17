import Vuelidate from 'vuelidate';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import EditProfileForm from '@/components/useraccount/userdetail/EditProfileForm.vue';

const localVue = createLocalVue();
localVue.use(Vuelidate);

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
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(EditProfileForm, options).isVueInstance()).toBeTruthy();
  });

  it('displays current form values', () => {
    const wrapper = shallowMount(EditProfileForm, options);
    wrapper.setData({ me });
    wrapper.find('[data-test="edit-profile-form-show"]').trigger('click');
    expect(wrapper.vm.form.firstName).toBe(me.customer.firstName);
    expect(wrapper.vm.form.lastName).toBe(me.customer.lastName);
    expect(wrapper.vm.form.email).toBe(me.customer.email);
  });

  it('re-opens form with initially stored values', () => {
    const wrapper = shallowMount(EditProfileForm, options);
    wrapper.setData({ me });
    wrapper.find('[data-test="edit-profile-form-show"]').trigger('click');
    wrapper.setData({ form: { ...newUser } });

    wrapper.find('[data-test="edit-profile-form-cancel"]').trigger('click');
    wrapper.find('[data-test="edit-profile-form-show"]').trigger('click');
    expect(wrapper.vm.form.firstName).toBe(me.customer.firstName);
    expect(wrapper.vm.form.lastName).toBe(me.customer.lastName);
    expect(wrapper.vm.form.email).toBe(me.customer.email);
  });
});
