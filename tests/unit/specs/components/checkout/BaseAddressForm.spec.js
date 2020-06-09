import Vuelidate from 'vuelidate';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import BaseAddressForm from '@/components/checkout/BaseAddressForm/BaseAddressForm.vue';

const localVue = createLocalVue();
localVue.use(Vuelidate);

describe('BaseAddressForm/index.vue', () => {
  let options;

  beforeEach(() => {
    options = {
      localVue,
      mocks: { $t: jest.fn() },
      propsData: { address: null },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(BaseAddressForm, options).isVueInstance()).toBeTruthy();
  });

  it('does not set form when no shipping address defined in cart', () => {
    const wrapper = shallowMount(BaseAddressForm, options);
    expect(wrapper.vm.form).toEqual({});
  });

  it('sets shipping address in form if defined', () => {
    options.propsData.address = { country: 'DE' };
    const wrapper = shallowMount(BaseAddressForm, options);
    expect(wrapper.vm.form).toEqual({ country: 'DE' });
  });

  it('removes typename from response when copying to form', () => {
    options.propsData.address = {
      firstName: 'Willy',
      country: 'DE',
      __typename: 'ShippingAddress',
    };
    const wrapper = shallowMount(BaseAddressForm, options);
    expect(wrapper.vm.form).toEqual({
      firstName: 'Willy',
      country: 'DE',
    });
  });

  it('flatters contact info in form', () => {
    options.propsData.address = {
      firstName: 'Willy',
      country: 'DE',
      contactInfo: {
        email: 'foo@example.com',
        phone: '+1234',
      },
    };
    const wrapper = shallowMount(BaseAddressForm, options);
    expect(wrapper.vm.form).toEqual({
      firstName: 'Willy',
      country: 'DE',
      email: 'foo@example.com',
      phone: '+1234',
    });
  });
});
