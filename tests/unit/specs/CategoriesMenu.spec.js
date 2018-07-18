import { shallowMount } from '@vue/test-utils';
import CategoriesMenu from '@/components/CategoriesMenu.vue';

describe('CategoriesMenu.vue', () => {
  it('renders a vue instance', () => {
    expect(shallowMount(CategoriesMenu).isVueInstance()).toBe(true);
  });

  it('decorates sales category', () => {
    const wrapper = shallowMount(CategoriesMenu, {
      mocks: {
        $sunrise: {
          categories: {
            salesExternalId: 'sale',
          },
        },
      },
    });
    expect(wrapper.vm.isSale({ externalId: 'sale' })).toBe(true);
  });
});
