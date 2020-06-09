import Vuelidate from 'vuelidate';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import EditProfileForm from '@/components/useraccount/userdetail/EditProfileForm/EditProfileForm.vue';

const localVue = createLocalVue();
localVue.use(Vuelidate);

describe('EditProfileForm/index.vue', () => {
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
    options.sync = false;
    const wrapper = shallowMount(EditProfileForm, options);
    wrapper.setData({ me });
    expect(wrapper.vm.form).toEqual({});

    wrapper.vm.openForm();
    expect(wrapper.vm.form).toEqual(me.customer);
  });

  it('re-opens form with initially stored values', () => {
    options.sync = false;
    const wrapper = shallowMount(EditProfileForm, options);
    wrapper.setData({ me });
    expect(wrapper.vm.form).toEqual({});

    wrapper.vm.openForm();
    expect(wrapper.vm.form).toEqual(me.customer);

    wrapper.setData({ form: { ...newUser } });
    expect(wrapper.vm.form).toEqual(newUser);

    wrapper.vm.closeForm();
    wrapper.vm.openForm();
    expect(wrapper.vm.form).toEqual(me.customer);
  });
});
