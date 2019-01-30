import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import BaseMoney from '@/components/common/BaseMoney.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('BaseMoney.vue', () => {
  let options;

  beforeEach(() => {
    options = {
      localVue,
      store: new Vuex.Store({
        state: {
          country: 'de-DE',
        },
      }),
      mocks: { $n: jest.fn() },
      propsData: {
        money: {
          centAmount: 1275,
          fractionDigits: 2,
        },
      },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(BaseMoney, options).isVueInstance()).toBeTruthy();
  });

  it('calls number formatting method with proper arguments', () => {
    const wrapper = shallowMount(BaseMoney, options);

    // eslint-disable-next-line no-unused-expressions
    wrapper.vm.formattedPrice;
    expect(options.mocks.$n).toHaveBeenCalledWith(12.75, 'currency', 'de-DE');
  });

  it('calculates price amount with 2 fraction digit', () => {
    const wrapper = shallowMount(BaseMoney, options);
    expect(wrapper.vm.amount).toBe(12.75);
  });

  it('calculates price amount with 1 fraction digit', () => {
    options.propsData.money.fractionDigits = 1;
    const wrapper = shallowMount(BaseMoney, options);

    expect(wrapper.vm.amount).toBe(127.5);
  });

  it.skip('calculates price amount with 0 fraction digits', () => {
    options.propsData.money.fractionDigits = 0;
    const wrapper = shallowMount(BaseMoney, options);

    expect(wrapper.vm.amount).toBe(1275);
  });
});
