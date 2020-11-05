import { shallowMount } from '@vue/test-utils';
import CartLikePriceDetail from '@/components/common/CartLike/CartLikePriceDetail/CartLikePriceDetail.vue';

describe('CartLikePriceDetail/index.vue', () => {
  const cartLike = {
    lineItems: [],
    totalPrice: {
      currencyCode: 'EUR',
      centAmount: 83050,
      fractionDigits: 2,
    },
    discountCodes: [{
      discountCode: {
        code: 'CODE2019',
      },
    }],
  };

  let options;

  beforeEach(() => {
    options = {
      // methods: { formatPrice: jest.fn() },
      mocks: { $t: jest.fn() },
      propsData: { cartLike },
      stubs: { 'router-link': true },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(CartLikePriceDetail, options).vm).toBeTruthy();
  });

  it('calculates applied taxes', () => {
    const wrapper = shallowMount(CartLikePriceDetail, options);
    expect(wrapper.vm.taxes).toBeNull();

    wrapper.setProps({
      cartLike: {
        ...cartLike,
        taxedPrice: {
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
        },
      },
    });
    expect(wrapper.vm.taxes).toEqual({
      value: {
        centAmount: 13260,
        currencyCode: 'EUR',
        fractionDigits: 2,
      },
    });
  });

  it('calculates subtotal price', () => {
    const wrapper = shallowMount(CartLikePriceDetail, options);
    expect(wrapper.vm.subtotal).toEqual({ value: { centAmount: 0, currencyCode: 'EUR', fractionDigits: 2 } });
    wrapper.setProps({
      cartLike: {
        ...cartLike,
        lineItems: [
          { quantity: 1, totalPrice: { centAmount: 11111 }, price: { value: { centAmount: 11111 } } },
          { quantity: 1, totalPrice: { centAmount: 22222 }, price: { value: { centAmount: 22222 } } },
          { quantity: 1, totalPrice: { centAmount: 44444 }, price: { value: { centAmount: 44444 } } },
        ],
      },
    });
    expect(wrapper.vm.subtotal).toEqual({
      value: {
        centAmount: 77777,
        currencyCode: 'EUR',
        fractionDigits: 2,
      },
    });
  });
});
