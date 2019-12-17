import Vuelidate from 'vuelidate';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import LineItemQuantityForm from '@/components/cartdetail/LineItemQuantityForm.vue';

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
      methods: { debouncedSubmit: mockedDebounced },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(LineItemQuantityForm, options).isVueInstance()).toBeTruthy();
  });

  it('does not submit on created', () => {
    const wrapper = shallowMount(LineItemQuantityForm, options);
    wrapper.setData({ debouncedSubmit: mockedDebounced });
    expect(mockedDebounced).not.toBeCalled();
  });

  it('does not submit on same quantity changed', () => {
    const wrapper = shallowMount(LineItemQuantityForm, options);
    wrapper.setData({ debouncedSubmit: mockedDebounced });
    wrapper.setData({ form: { quantity: 3 } });
    expect(mockedDebounced).not.toBeCalled();
  });

  it('submits when quantity changes', () => {
    const wrapper = shallowMount(LineItemQuantityForm, options);
    wrapper.setData({ debouncedSubmit: mockedDebounced });
    wrapper.setData({ form: { quantity: 8 } });
    expect(mockedDebounced).toBeCalled();
  });

  it('does not submit when quantity is wrong', () => {
    const wrapper = shallowMount(LineItemQuantityForm, options);
    wrapper.setData({ debouncedSubmit: mockedDebounced });
    wrapper.setData({ form: { quantity: 'wrong' } });
    expect(mockedDebounced).not.toBeCalled();
  });
});
