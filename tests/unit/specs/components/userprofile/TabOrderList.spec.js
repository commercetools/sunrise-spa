import VueI18n from 'vue-i18n';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import TabOrderList from '@/components/useraccount/myorders/TabOrderList.vue';

const localVue = createLocalVue();
localVue.use(VueI18n);

describe('TabOrderList.vue', () => {
  let options;

  beforeEach(() => {
    options = {
      localVue,
      computed: {
        isLoading: jest.fn(),
      },
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
    expect(shallowMount(TabOrderList, options).isVueInstance()).toBeTruthy();
  });

  it('shows the right status in all cases', () => {
    const wrapper = shallowMount(TabOrderList, options);
    expect(wrapper.vm.translateStatus('Ready')).toBe('Bereit');
    expect(wrapper.vm.translateStatus(null)).toBe('-');
    expect(wrapper.vm.translateStatus('DoesntExist')).toBe('DoesntExist');
  });
});
