import { shallowMount } from '@vue/test-utils';
import PriceCalculation from '@/components/useraccount/orderdetail/PriceCalculation.vue';

describe('PriceCalculation.vue', () => {
  const me = {
    order: {
      lineItems: [],
      shippingInfo: {
        price: {
          currencyCode: 'EUR',
          centAmount: 1000,
          fractionDigits: 2,
        },
      },
      taxedPrice: {
        taxPortions: [
          {
            amount: {
              centAmount: 6914,
              currencyCode: 'EUR',
              fractionDigits: 2,
            },
          },
        ],
      },
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

  it('calculates subtotal price', () => {
    const wrapper = shallowMount(PriceCalculation, options);
    wrapper.setData({ me });
    expect(wrapper.vm.subtotal).toEqual({
      centAmount: 0,
      currencyCode: 'EUR',
      fractionDigits: 2,
    });

    wrapper.setData({
      me: {
        order: {
          ...me.order,
          lineItems: [
            { totalPrice: { centAmount: 11111 } },
            { totalPrice: { centAmount: 22222 } },
            { totalPrice: { centAmount: 44444 } },
          ],
        },
      },
    });
    expect(wrapper.vm.subtotal).toEqual({
      centAmount: 77777,
      currencyCode: 'EUR',
      fractionDigits: 2,
    });
  });
});
