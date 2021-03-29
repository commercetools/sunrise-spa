import Vue from 'vue';
import Vuex from 'vuex';
import Vuelidate from 'vuelidate';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import AddToCartForm from '@/components/productdetail/AddToCartForm/AddToCartForm.vue';
import SelectBoxIt from '@/components/common/form/SelectBoxIt/SelectBoxIt.vue';
import { addLine } from '../../../../../src/components/common/shared';

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
      propsData: { sku: 'some-sku', isOnStock: true },
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
  it('channels added to cart line item', async () => {
    const updateMyCart = jest.fn();
    const createMyCart = jest.fn();
    const component = {
      cartExists:true,
      $store:{
        state:{
          channel:{ id: 88 }
        }
      },
      sku:'sku',
      quantity: 888,
      updateMyCart,
      createMyCart,
    }
    addLine(component);
    expect(updateMyCart).toHaveBeenCalledWith({
      "addLineItem": {
        "distributionChannel": {
          "id": 88,
          "typeId": "channel"
        },
        "quantity": 888,
        "sku": "sku",
        "supplyChannel": {
          "id": 88,
          "typeId": "channel"
        }
      }
    });
    updateMyCart.mockReset();
    component.$store.state={
      currency:1,country:2
    }
    addLine(component);
    expect(updateMyCart)
      .toHaveBeenLastCalledWith(
        {"addLineItem": {"quantity": 888, "sku": "sku"}}
      );
    component.cartExists = false;
    updateMyCart.mockReset();
    createMyCart.mockReturnValue(Promise.resolve(88))
    await addLine(component);
    expect(createMyCart).toHaveBeenCalledWith(
      {"country": 2, "currency": 1, "shippingAddress": {"country": 2}}
    )
    expect(updateMyCart)
      .toHaveBeenCalledWith(
        {"addLineItem": {"quantity": 888, "sku": "sku"}}
      )
    
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
