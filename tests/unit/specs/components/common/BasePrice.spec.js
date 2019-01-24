import { shallowMount } from '@vue/test-utils';
import BasePrice from '@/components/common/BasePrice.vue';

describe('BasePrice.vue', () => {
  const discountedPrice = {
    discounted: {
      value: {
        centAmount: '1000',
        fractionDigits: '2',
      },
    },
  };

  const originalPrice = {
    value: {
      centAmount: '1700',
      fractionDigits: '2',
    },
  };

  let options;
  let price;


  beforeEach(() => {
    price = {
      ...originalPrice,
    };

    options = {
      propsData: { price },
    };
  });

  Object.assign(BasePrice.computed, price);

  it('renders a vue instance', () => {
    expect(shallowMount(BasePrice, options).isVueInstance()).toBeTruthy();
  });

  it('Obtains whether product has a discount', () => {
    const wrapper = shallowMount(BasePrice, options);
    expect(wrapper.vm.hasDiscount).toBeFalsy();

    wrapper.setProps({ price: { ...discountedPrice } });
    expect(wrapper.vm.hasDiscount).toBeTruthy();
  });

  it('obtains the discounted price', () => {
    const wrapper = shallowMount(BasePrice, options);
    wrapper.setProps({ price: { ...discountedPrice } });

    expect(wrapper.vm.discountedPrice).toBeTruthy();
  });

  it('obtains the original price', () => {
    const wrapper = shallowMount(BasePrice, options);
    expect(wrapper.vm.originalPrice).toBeTruthy();
  });
});
