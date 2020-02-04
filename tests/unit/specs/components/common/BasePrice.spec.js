import { shallowMount } from '@vue/test-utils';
import BasePrice from '@/components/common/BasePrice/index.vue';

describe('BasePrice/index.vue', () => {
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

  it('renders a vue instance', () => {
    expect(shallowMount(BasePrice, options).isVueInstance()).toBeTruthy();
  });

  it('obtains whether product has a discount', () => {
    const wrapper = shallowMount(BasePrice, options);
    expect(wrapper.vm.hasDiscount).toBeFalsy();

    wrapper.setProps({ price: { ...discountedPrice } });
    expect(wrapper.vm.hasDiscount).toBeTruthy();
  });

  it('obtains the discounted price', () => {
    const wrapper = shallowMount(BasePrice, options);
    wrapper.setProps({ price: { ...discountedPrice } });

    const discounted = { ...discountedPrice.discounted.value };
    expect(wrapper.vm.discountedPrice).toEqual(discounted);
  });

  it('obtains the original price', () => {
    const wrapper = shallowMount(BasePrice, options);

    const original = { ...originalPrice.value };
    expect(wrapper.vm.originalPrice).toEqual(original);
  });
});
