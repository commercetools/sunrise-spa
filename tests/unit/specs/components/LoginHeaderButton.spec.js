import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import LoginHeaderButton from '@/components/LoginHeaderButton.vue';

jest.mock('@/auth', () => ({ clientLogout: jest.fn() }));

const localVue = createLocalVue();
localVue.use(Vuex);

describe('LoginHeaderButton.vue', () => {
  let options;
  let state;

  beforeEach(() => {
    state = { authenticated: false };
    options = {
      localVue,
      methods: { logout: jest.fn() },
      store: new Vuex.Store({ state }),
      mocks: { $t: jest.fn() },
      stubs: { 'router-link': true },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(LoginHeaderButton, options).isVueInstance()).toBeTruthy();
  });

  it('shows logout and user info when authenticated', () => {
    const wrapper = shallowMount(LoginHeaderButton, options);
    expect(wrapper.vm.showLoggedIn).toBeFalsy();

    wrapper.setData({
      me: {
        customer: {
          id: 'some-id',
          firstName: 'Willy',
        },
      },
    });
    expect(wrapper.vm.showLoggedIn).toBeFalsy();

    state.authenticated = true;
    expect(wrapper.vm.showLoggedIn).toBeTruthy();
  });

  it('logs out', () => {
    state.authenticated = true;
    const wrapper = shallowMount(LoginHeaderButton, options);
    wrapper.setData({ me: { customer: {} } });
    wrapper.find('[data-test="logout-button"]').trigger('click');
    expect(options.methods.logout).toHaveBeenCalled();
  });
});
