import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import MiniCart from '@/components/header/MiniCart.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('MiniCart.vue', () => {
  const lineItem = {
    quantity: 3,
    variant: {},
  };

  let me;
  let state;
  let options;

  beforeEach(() => {
    me = {
      activeCart: {
        lineItems: [],
      },
    };
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

  it('sorts line items', () => {
    const wrapper = shallowMount(MiniCart, options);
    wrapper.setData({ me });
    expect(wrapper.vm.sortedLineItems).toEqual([]);

    wrapper.setData({
      me: {
        activeCart: {
          lineItems: [{ id: 'id1' }],
        },
      },
    });
    expect(wrapper.vm.sortedLineItems).toEqual([{ id: 'id1' }]);

    wrapper.setData({
      me: {
        activeCart: {
          lineItems: [{ id: 'id1' }, { id: 'id2' }, { id: 'id3' }],
        },
      },
    });
    expect(wrapper.vm.sortedLineItems).toEqual([
      { id: 'id3' },
      { id: 'id2' },
      { id: 'id1' },
    ]);
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
          lineItems: [lineItem, lineItem, lineItem],
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
          lineItems: [lineItem, lineItem, lineItem],
        },
      },
    });
    expect(wrapper.vm.show).toBeTruthy();
    expect(wrapper.find('[data-test="mini-cart-content"]').isVisible()).toBeTruthy();
    expect(wrapper.findAll('[data-test="mini-cart-line-item"]').length).toBe(3);
  });
});
