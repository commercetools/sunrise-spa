import Vuelidate from 'vuelidate';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import LineItemQuantityForm from '@/components/cartdetail/LineItemQuantityForm.vue';

jest.mock('lodash.debounce', () => jest.fn(fn => fn));

const localVue = createLocalVue();
localVue.use(Vuelidate);

describe('LineItemQuantityForm.vue', () => {
  let mockedDebounced;
  let options;

  beforeEach(() => {
    mockedDebounced = jest.fn();

    options = {
      localVue,
      propsData: { lineItemId: 'li-id', quantity: 3 },
      computed: { cartExists: () => true },
      methods: { submit: mockedDebounced },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(LineItemQuantityForm, options).isVueInstance()).toBeTruthy();
  });

  it('does not submit on created', () => {
    shallowMount(LineItemQuantityForm, options);
    expect(mockedDebounced).not.toBeCalled();
  });

  it('does not submit on same quantity changed', () => {
    const wrapper = shallowMount(LineItemQuantityForm, options);
    wrapper.setData({ form: { quantity: 3 } });
    expect(mockedDebounced).not.toBeCalled();
  });

  it('submits when quantity changes', () => {
    const wrapper = shallowMount(LineItemQuantityForm, options);
    wrapper.setData({ form: { quantity: 8 } });
    expect(mockedDebounced).toBeCalled();
  });

  it('does not submit when quantity is wrong', () => {
    const wrapper = shallowMount(LineItemQuantityForm, options);
    wrapper.setData({ form: { quantity: 'wrong' } });
    expect(mockedDebounced).not.toBeCalled();
  });


  it('submits on increment/decrement buttons clicked', () => {
    const wrapper = shallowMount(LineItemQuantityForm, options);

    wrapper.find('[data-test="cart-line-item-quantity-inc"]').trigger('click');
    expect(wrapper.vm.form.quantity).toBe(4);
    expect(mockedDebounced).toBeCalledTimes(1);

    wrapper.find('[data-test="cart-line-item-quantity-dec"]').trigger('click');
    expect(wrapper.vm.form.quantity).toBe(3);
    expect(mockedDebounced).toBeCalledTimes(2);
  });
});
