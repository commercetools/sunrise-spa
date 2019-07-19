import { shallowMount } from '@vue/test-utils';
import CartLikePriceDetail from '@/components/common/cartlike/CartLikePriceDetail.vue';

describe('CartLikePriceDetail.vue', () => {
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
      methods: { formatPrice: jest.fn() },
      mocks: { $t: jest.fn() },
      propsData: { cartLike },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(CartLikePriceDetail, options).isVueInstance()).toBeTruthy();
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
      centAmount: 13260,
      currencyCode: 'EUR',
      fractionDigits: 2,
    });
  });

  it('calculates subtotal price', () => {
    const wrapper = shallowMount(CartLikePriceDetail, options);
    expect(wrapper.vm.subtotal).toEqual({
      centAmount: 0,
      currencyCode: 'EUR',
      fractionDigits: 2,
    });

    wrapper.setProps({
      cartLike: {
        ...cartLike,
        lineItems: [
          { totalPrice: { centAmount: 11111 } },
          { totalPrice: { centAmount: 22222 } },
          { totalPrice: { centAmount: 44444 } },
        ],
      },
    });
    expect(wrapper.vm.subtotal).toEqual({
      centAmount: 77777,
      currencyCode: 'EUR',
      fractionDigits: 2,
    });
  });
});
