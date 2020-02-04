import Vuelidate from 'vuelidate';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import SignUpForm from '@/components/login/SignUpForm/index.vue';

jest.mock('@/auth', () => ({ clientLogin: jest.fn() }));

const localVue = createLocalVue();
localVue.use(Vuelidate);

describe('SignUpForm/index.vue', () => {
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
});
