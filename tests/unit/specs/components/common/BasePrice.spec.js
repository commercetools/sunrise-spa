import { shallowMount } from '@vue/test-utils';
import BasePrice from '@/components/common/BasePrice/BasePrice.vue';

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
    expect(shallowMount(BasePrice, options).vm).toBeTruthy();
  });

  it('obtains whether product has a discount', async () => {
    const wrapper = shallowMount(BasePrice, options);
    expect(wrapper.vm.hasDiscount).toBeFalsy();

    wrapper.setProps({ price: { ...discountedPrice } });
    //tests will fail after minor update
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.hasDiscount).toBeTruthy();
  });

  it('obtains the discounted price', async () => {
    const wrapper = shallowMount(BasePrice, options);
    wrapper.setProps({ price: { ...discountedPrice } });
    //tests will fail after minor update
    await wrapper.vm.$nextTick();

    const discounted = { ...discountedPrice.discounted.value };
    expect(wrapper.vm.discountedPrice).toEqual(discounted);
  });

  it('obtains the original price', () => {
    const wrapper = shallowMount(BasePrice, options);

    const original = { ...originalPrice.value };
    expect(wrapper.vm.originalPrice).toEqual(original);
  });
});
