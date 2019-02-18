import Vue from 'vue';
import Vuelidate from 'vuelidate';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import AddToCartForm from '@/components/productdetail/AddToCartForm.vue';
import SelectBoxIt from '@/components/common/SelectBoxIt.vue';

const localVue = createLocalVue();
localVue.use(Vuelidate);

Vue.component('SelectBoxIt', SelectBoxIt);

describe('AddToCartForm.vue', () => {
  let options;

  beforeEach(() => {
    options = {
      localVue,
      mocks: { $t: jest.fn() },
      propsData: { sku: 'some-sku' },
      methods: {
        createCart: jest.fn(),
        updateMyCart: jest.fn(),
      },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(AddToCartForm, options).isVueInstance()).toBeTruthy();
  });

  it('returns the quantities to be displayed', () => {
    const wrapper = shallowMount(AddToCartForm, options);
    expect(wrapper.vm.quantities.length).toBe(10);

    wrapper.setData({ maxQuantity: 1 });
    expect(wrapper.vm.quantities).toEqual([
      { id: 1, name: 1 },
    ]);

    wrapper.setData({ maxQuantity: 5 });
    expect(wrapper.vm.quantities).toEqual([
      { id: 1, name: 1 },
      { id: 2, name: 2 },
      { id: 3, name: 3 },
      { id: 4, name: 4 },
      { id: 5, name: 5 },
    ]);
  });

  it('on submit it creates a cart when cart does not exist', async () => {
    const wrapper = shallowMount(AddToCartForm, options);
    wrapper.setData({
      me: {},
    });

    await wrapper.vm.submit();
    expect(options.methods.createCart).toHaveBeenCalled();
    expect(options.methods.updateMyCart).toHaveBeenCalled();
  });

  it('on submit it does not create a cart if it exists', async () => {
    const wrapper = shallowMount(AddToCartForm, options);
    wrapper.setData({
      me: {
        activeCart: {},
      },
    });

    await wrapper.vm.submit();
    expect(options.methods.createCart).not.toHaveBeenCalled();
    expect(options.methods.updateMyCart).toHaveBeenCalled();
  });
});
