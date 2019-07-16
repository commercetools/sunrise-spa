import Vuelidate from 'vuelidate';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import LineItem from '@/components/common/LineItem.vue';

jest.mock('lodash.debounce', () => jest.fn(fn => fn));

const localVue = createLocalVue();
localVue.use(Vuelidate);

function setInputValue(input, value) {
  input.setValue(value);
  input.trigger('change');
  input.trigger('blur');
}

describe('LineItem.vue', () => {
  let lineItem;
  let options;

  beforeEach(() => {
    lineItem = {
      id: 'li-id',
      quantity: 3,
      variant: {},
      price: {},
      discountedPricePerQuantity: {},
      totalPrice: {},
    };

    options = {
      localVue,
      methods: { formatPrice: jest.fn() },
      mocks: { $t: jest.fn() },
      propsData: { lineItem },
      stubs: { 'router-link': true },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(LineItem, options).isVueInstance()).toBeTruthy();
  });

  it('emits event on quantity changed', () => {
    options.propsData.editable = true;
    const wrapper = shallowMount(LineItem, options);
    expect(wrapper.vm.quantity).toBe(3);

    setInputValue(wrapper.find('[data-test="cart-line-item-quantity"]'), 8);
    wrapper.vm.$forceUpdate();
    expect(wrapper.vm.quantity).toBe(8);
    expect(wrapper.emitted('changeLineItemQuantity')[0]).toEqual(['li-id', 8]);

    setInputValue(wrapper.find('[data-test="cart-line-item-quantity"]'), 8);
    wrapper.vm.$forceUpdate();
    expect(wrapper.vm.quantity).toBe(8);
    expect(wrapper.emitted('changeLineItemQuantity')[1]).toBeUndefined();
  });

  it('does not emit event on wrong quantity', () => {
    options.propsData.editable = true;
    const wrapper = shallowMount(LineItem, options);

    setInputValue(wrapper.find('[data-test="cart-line-item-quantity"]'), 'wrong');
    wrapper.vm.$forceUpdate();
    expect(wrapper.emitted('changeLineItemQuantity')).toBeUndefined();
  });

  it('emits event on increment/decrement buttons clicked', () => {
    options.propsData.editable = true;
    const wrapper = shallowMount(LineItem, options);
    expect(wrapper.vm.quantity).toBe(3);

    wrapper.find('[data-test="cart-line-item-quantity-inc"]').trigger('click');
    expect(wrapper.vm.quantity).toBe(4);
    expect(wrapper.emitted('changeLineItemQuantity')[0]).toEqual(['li-id', 4]);

    wrapper.find('[data-test="cart-line-item-quantity-dec"]').trigger('click');
    expect(wrapper.vm.quantity).toBe(3);
    expect(wrapper.emitted('changeLineItemQuantity')[1]).toEqual(['li-id', 3]);
  });

  it('emits event on remove button clicked', () => {
    options.propsData.editable = true;
    const wrapper = shallowMount(LineItem, options);

    wrapper.find('[data-test="cart-line-item-delete"]').trigger('click');
    expect(wrapper.emitted('removeLineItem')[0]).toEqual(['li-id']);
  });
});
