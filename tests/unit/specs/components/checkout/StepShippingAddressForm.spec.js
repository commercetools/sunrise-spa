import Vuelidate from 'vuelidate';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import StepShippingAddressForm from '@/components/checkout/StepShippingAddressForm.vue';

const localVue = createLocalVue();
localVue.use(Vuelidate);

describe('StepShippingAddressForm.vue', () => {
  let options;

  beforeEach(() => {
    options = {
      localVue,
      mocks: { $t: jest.fn() },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(StepShippingAddressForm, options).isVueInstance()).toBeTruthy();
  });

  it('does not set form when no shipping address defined in cart', () => {
    const wrapper = shallowMount(StepShippingAddressForm, options);
    expect(wrapper.vm.form).toEqual({});

    wrapper.setData({ me: { } });
    expect(wrapper.vm.form).toEqual({});

    wrapper.setData({ me: { activeCart: null } });
    expect(wrapper.vm.form).toEqual({});

    wrapper.setData({ me: { activeCart: { shippingAddress: null } } });
    expect(wrapper.vm.form).toEqual({});
  });

  it('sets shipping address in form if defined', () => {
    const wrapper = shallowMount(StepShippingAddressForm, options);
    expect(wrapper.vm.form).toEqual({});

    wrapper.setData({
      me: {
        activeCart: {
          shippingAddress: {
            country: 'DE',
          },
        },
      },
    });
    expect(wrapper.vm.form).toEqual({
      country: 'DE',
    });
  });

  it('removes typename from response when copying to form', () => {
    const wrapper = shallowMount(StepShippingAddressForm, options);
    expect(wrapper.vm.form).toEqual({});

    wrapper.setData({
      me: {
        activeCart: {
          shippingAddress: {
            firstName: 'Willy',
            country: 'DE',
            __typename: 'ShippingAddress',
          },
        },
      },
    });
    expect(wrapper.vm.form).toEqual({
      firstName: 'Willy',
      country: 'DE',
    });
  });

  it('flatters contact info in form', () => {
    const wrapper = shallowMount(StepShippingAddressForm, options);
    expect(wrapper.vm.form).toEqual({});

    wrapper.setData({
      me: {
        activeCart: {
          shippingAddress: {
            firstName: 'Willy',
            country: 'DE',
            contactInfo: {
              email: 'foo@example.com',
              phone: '+1234',
            },
          },
        },
      },
    });
    expect(wrapper.vm.form).toEqual({
      firstName: 'Willy',
      country: 'DE',
      email: 'foo@example.com',
      phone: '+1234',
    });
  });
});
