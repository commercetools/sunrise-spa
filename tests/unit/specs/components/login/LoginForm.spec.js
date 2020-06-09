import Vuelidate from 'vuelidate';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import LoginForm from '@/components/login/LoginForm/LoginForm.vue';

const localVue = createLocalVue();
localVue.use(Vuelidate);

jest.mock('@/auth', () => ({ clientLogin: jest.fn() }));

describe('LoginForm/index.vue', () => {
  let options;

  beforeEach(() => {
    options = {
      localVue,
      mocks: { $t: jest.fn() },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(LoginForm, options).isVueInstance()).toBeTruthy();
  });
});
