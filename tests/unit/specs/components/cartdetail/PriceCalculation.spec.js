import { shallowMount } from '@vue/test-utils';
import PriceCalculation from '@/components/cartdetail/PriceCalculation.vue';

describe('PriceCalculation.vue', () => {
  const taxedPrice = {
    totalNet: {
      currencyCode: 'EUR',
      centAmount: 69790,
      fractionDigits: 2,
    },
    totalGross: {
      currencyCode: 'EUR',
      centAmount: 83050,
      fractionDigits: 2,
    },
  };

  const me = {
    activeCart: {
      lineItems: [],
      totalPrice: {
        currencyCode: 'EUR',
        centAmount: 83050,
        fractionDigits: 2,
      },
    },
  };

  let options;

  beforeEach(() => {
    options = {
      methods: { formatPrice: jest.fn() },
      mocks: { $t: jest.fn() },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(PriceCalculation, options).isVueInstance()).toBeTruthy();
  });

  it('calculates applied taxes', () => {
    const wrapper = shallowMount(PriceCalculation, options);
    wrapper.setData({ me });
    expect(wrapper.vm.taxes).toEqual({
      centAmount: 0,
      currencyCode: 'EUR',
      fractionDigits: 2,
    });

    wrapper.setData({
      me: {
        activeCart: {
          ...me.activeCart,
          taxedPrice,
        },
      },
    });
    expect(wrapper.vm.taxes).toEqual({
      centAmount: 13260,
      currencyCode: 'EUR',
      fractionDigits: 2,
    });
  });
});
