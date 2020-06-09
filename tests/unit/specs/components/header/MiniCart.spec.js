import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import MiniCart from '@/components/header/MiniCart/MiniCart.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('MiniCart/index.vue', () => {
  const lineItem = id => ({
    id,
    quantity: 3,
    variant: {},
    totalPrice: {},
  });

  let state;
  let options;

  beforeEach(() => {
    state = { miniCartOpen: false };

    options = {
      localVue,
      methods: { formatPrice: jest.fn() },
      mocks: { $t: jest.fn() },
      stubs: { 'router-link': true },
      store: new Vuex.Store({ state }),
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(MiniCart, options).isVueInstance()).toBeTruthy();
  });

  it('close it according to store', () => {
    state.miniCartOpen = false;
    const wrapper = shallowMount(MiniCart, options);
    expect(wrapper.vm.show).toBeFalsy();
    expect(wrapper.find('[data-test="mini-cart-content"]').exists()).toBeFalsy();
    expect(wrapper.findAll('[data-test="mini-cart-line-item"]').length).toBe(0);

    wrapper.setData({
      me: {
        activeCart: {
          lineItems: [lineItem('id1'), lineItem('id2'), lineItem('id3')],
          totalPrice: {},
        },
      },
    });
    expect(wrapper.vm.show).toBeFalsy();
    expect(wrapper.find('[data-test="mini-cart-content"]').isVisible()).toBeFalsy();
    expect(wrapper.findAll('[data-test="mini-cart-line-item"]').length).toBe(3);
  });

  it('open it according to store', () => {
    state.miniCartOpen = true;
    const wrapper = shallowMount(MiniCart, options);
    expect(wrapper.vm.show).toBeTruthy();
    expect(wrapper.find('[data-test="mini-cart-content"]').exists()).toBeFalsy();
    expect(wrapper.findAll('[data-test="mini-cart-line-item"]').length).toBe(0);

    wrapper.setData({
      me: {
        activeCart: {
          lineItems: [lineItem('id1'), lineItem('id2'), lineItem('id3')],
          totalPrice: {},
        },
      },
    });
    expect(wrapper.vm.show).toBeTruthy();
    expect(wrapper.find('[data-test="mini-cart-content"]').isVisible()).toBeTruthy();
    expect(wrapper.findAll('[data-test="mini-cart-line-item"]').length).toBe(3);
  });
});
