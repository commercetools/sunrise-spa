import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import LoginBoxHeader from '@/components/LoginBoxHeader.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('LoginBoxHeader.vue', () => {
  let options;
  let actions;
  let getters;

  beforeEach(() => {
    actions = { logout: jest.fn() };
    getters = {
      isAuthenticated: jest.fn(),
      user: jest.fn(),
    };
    options = {
      localVue,
      store: new Vuex.Store({
        modules: {
          user: {
            actions,
            getters,
          },
        },
      }),
      mocks: { $t: jest.fn() },
      stubs: { 'router-link': '<a></a>' },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(LoginBoxHeader, options).isVueInstance()).toBeTruthy();
  });

  it('logs out', () => {
    getters.isAuthenticated.mockReturnValue(true);
    getters.user.mockReturnValue({});
    const wrapper = shallowMount(LoginBoxHeader, options);
    wrapper.find('[data-test="logout-button"]').trigger('click');
    expect(actions.logout).toHaveBeenCalled();
  });
});
