import { shallowMount, createLocalVue } from '@vue/test-utils';
import MyOrders from '@/components/useraccount/MyOrders.vue';
import VueI18n from 'vue-i18n';

const localVue = createLocalVue();
localVue.use(VueI18n);

describe('MyOrders.vue', () => {
  let options;

  beforeEach(() => {
    options = {
      localVue,
      i18n: new VueI18n({
        locale: 'de',
        messages: {
          de: {
            Ready: 'Bereit',
          },
        },
      }),
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(MyOrders, options).isVueInstance()).toBeTruthy();
  });

  it('shows the right status in all cases', () => {
    const wrapper = shallowMount(MyOrders, options);
    expect(wrapper.vm.translateStatus('Ready')).toBe('Bereit');
    expect(wrapper.vm.translateStatus(null)).toBe('-');
    expect(wrapper.vm.translateStatus('DoesntExist')).toBe('DoesntExist');
  });
});
