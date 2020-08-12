import Vuelidate from 'vuelidate';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import TabAccountDetails from '@/components/useraccount/TabAccountDetails/TabAccountDetails.vue';

const localVue = createLocalVue();
localVue.use(Vuelidate);

describe('TabAccountDetails/index.vue', () => {
  const me = {
    customer: {
      email: 'willy.wonka@commercetools.com',
      firstName: 'Willy',
      lastName: 'Wonka',
    },
  };

  let options;

  beforeEach(() => {
    options = {
      localVue,
      mocks: { $t: jest.fn() },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(TabAccountDetails, options).vm).toBeTruthy();
  });

  it('displays current form values', async () => {
    const wrapper = shallowMount(TabAccountDetails, options);
    wrapper.setData({ me });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.form).toEqual(me.customer);
  });
});
