import { shallowMount } from '@vue/test-utils';
import CartLikeContentDetail from '@/components/common/cartlike/CartLikeContentDetail.vue';

describe('CartLikeContentDetail.vue', () => {
  const cartLike = {
    lineItems: [],
    totalPrice: {
      currencyCode: 'EUR',
      centAmount: 18625,
      fractionDigits: 2,
    },
    discountCodes: [{
      discountCode: {
        code: 'SUNRISE_CI',
      },
    }],
  };

  let options;
  let lineItem;

  beforeEach(() => {
    options = {
      methods: { formatPrice: jest.fn() },
      mocks: { $t: jest.fn() },
      propsData: { cartLike },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(CartLikeContentDetail, options).isVueInstance()).toBeTruthy();
  });

  it('transforms the totalPrice with a cart discount', () => {
    lineItem = {
      price: {
        value: {
          currencyCode: 'EUR',
          centAmount: 37250,
          fractionDigits: 2,
        },
      },
      quantity: 2,
      totalPrice: {
        currencyCode: 'EUR',
        centAmount: 37250,
        fractionDigits: 2,
      },
    };
    const wrapper = shallowMount(CartLikeContentDetail, options);
    expect(wrapper.vm.totalPrice(lineItem)).toEqual({
      discounted: {
        value: {
          centAmount: 37250,
          currencyCode: 'EUR',
          fractionDigits: 2,
        },
      },
      value: {
        centAmount: 74500,
        currencyCode: 'EUR',
        fractionDigits: 2,
      },
    });
  });
  it('transforms the totalPrice with a product discount', () => {
    lineItem = {
      price: {
        discounted: {
          value: {
            currencyCode: 'EUR',
            centAmount: 17412,
            fractionDigits: 2,
          },
        },
        value: {
          currencyCode: 'EUR',
          centAmount: 24875,
          fractionDigits: 2,
        },
      },
      quantity: 3,
      totalPrice: {
        currencyCode: 'EUR',
        centAmount: 26118,
        fractionDigits: 2,
      },
    };
    const wrapper = shallowMount(CartLikeContentDetail, options);
    expect(wrapper.vm.totalPrice(lineItem)).toEqual({
      discounted: {
        value: {
          centAmount: 26118,
          currencyCode: 'EUR',
          fractionDigits: 2,
        },
      },
      value: {
        centAmount: 52236,
        currencyCode: 'EUR',
        fractionDigits: 2,
      },
    });
  });
  it('transforms the totalPrice without discounts', () => {
    lineItem = {
      price: {
        value: {
          currencyCode: 'EUR',
          centAmount: 46250,
          fractionDigits: 2,
        },
      },
      quantity: 1,
      totalPrice: {
        currencyCode: 'EUR',
        centAmount: 46250,
        fractionDigits: 2,
      },
    };
    const wrapper = shallowMount(CartLikeContentDetail, options);
    expect(wrapper.vm.totalPrice(lineItem)).toEqual({
      value: {
        centAmount: 46250,
        currencyCode: 'EUR',
        fractionDigits: 2,
      },
    });
  });
});
