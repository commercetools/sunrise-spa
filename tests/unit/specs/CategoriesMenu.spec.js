import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import CategoriesMenu from '@/components/CategoriesMenu.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);

const category = {
  id: 'category-id',
  externalId: 'category-external-id',
  name: 'category-name',
  slug: 'category-slug',
};

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

  it.skip('opens a submenu', () => {
    const wrapper = shallowMount(CategoriesMenu, {
      localVue,
    });
    wrapper.setData({
      categories: {
        results: [category],
      },
    });
    expect(wrapper.vm.isMenuOpen(category)).toBe(false);
    wrapper.find('[data-test="categories-1st-level"] > li').trigger('mouseover');
    expect(wrapper.vm.isMenuOpen(category)).toBe(true);
  });
});
