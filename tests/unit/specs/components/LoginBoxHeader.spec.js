import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import LoginBoxHeader from '@/components/LoginBoxHeader.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('LoginBoxHeader.vue', () => {
  let options;
  let actions;
  let state;

  beforeEach(() => {
    actions = { logout: jest.fn() };
    state = {
      isLoggedIn: false,
      info: {},
    };
    options = {
      localVue,
      store: new Vuex.Store({
        modules: {
          user: {
            actions,
            state,
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
    state.isLoggedIn = true;
    const wrapper = shallowMount(LoginBoxHeader, options);
    wrapper.find('[data-test="logout-button"]').trigger('click');
    expect(actions.logout).toHaveBeenCalled();
  });
});
