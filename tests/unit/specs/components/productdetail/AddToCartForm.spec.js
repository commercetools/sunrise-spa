import Vue from 'vue';
import Vuex from 'vuex';
import Vuelidate from 'vuelidate';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import AddToCartForm from '@/components/productdetail/AddToCartForm/AddToCartForm.vue';
import { updateCartVariables } from '@/components/productdetail/AddToCartForm/AddToCartForm';
import SelectBoxIt from '@/components/common/form/SelectBoxIt/SelectBoxIt.vue';

const localVue = createLocalVue();
localVue.use(Vuelidate);
localVue.use(Vuex);

Vue.component('SelectBoxIt', SelectBoxIt);

describe('AddToCartForm/index.vue', () => {
  let actions;
  let options;

  beforeEach(() => {
    actions = { openMiniCart: jest.fn() };

    options = {
      localVue,
      mocks: { $t: jest.fn() },
      store: new Vuex.Store({ actions }),
      propsData: { sku: 'some-sku' },
      computed: {
        currency: () => 'EUR',
        isLoading: jest.fn(),
      },
      // overriding methods is depricated
      // methods: {
      //   createMyCart: jest.fn(() => Promise.resolve({})),
      //   updateMyCart: jest.fn(() => Promise.resolve({})),
      // },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(AddToCartForm, options).vm).toBeTruthy();
  });

  it('distribution channel is added to cart item', () => {
    const variables = updateCartVariables({
      $store: {
        state: {
          channel: { id: 'channel id' },
        },
      },
      sku: 'sku',
      quantity: 3,
    });
    expect(variables).toEqual({
      addLineItem: {
        distributionChannel: {
          id: 'channel id',
          typeId: 'channel',
        },
        quantity: 3,
        sku: 'sku',
      },
    });
    const variables1 = updateCartVariables({
      $store: {
        state: {},
      },
      sku: 'sku 1',
      quantity: 8,
    });
    expect(variables1).toEqual({
      addLineItem: {
        quantity: 8,
        sku: 'sku 1',
      },
    });
  });

  xit('returns the quantities to be displayed', () => {
    const wrapper = shallowMount(AddToCartForm, options);
    expect(wrapper.vm.quantities.length).toBe(10);
    expect(wrapper.vm.quantities[2]).toEqual({ id: 3, name: 3 });
  });

  xit('on submit it creates a cart when cart does not exist', async () => {
    options.computed.cartExists = () => false;
    const wrapper = shallowMount(AddToCartForm, options);
    await wrapper.vm.addLineItem();
    expect(options.methods.createMyCart).toBeCalled();
    expect(options.methods.updateMyCart).toBeCalled();
    expect(actions.openMiniCart).toBeCalled();
  });

  xit('on submit it does not create a cart if it exists', async () => {
    options.computed.cartExists = () => true;
    const wrapper = shallowMount(AddToCartForm, options);
    await wrapper.vm.addLineItem();
    expect(options.methods.createMyCart).not.toBeCalled();
    expect(options.methods.updateMyCart).toBeCalled();
    expect(actions.openMiniCart).toBeCalled();
  });
});
