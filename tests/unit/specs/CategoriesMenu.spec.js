import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import CategoriesMenu from '@/components/CategoriesMenu.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

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
      router,
      stubs: ['router-link', 'router-view'],
    });
    wrapper.setData({
      categories: {
        results: [{ id: 'category', name: 'Category' }],
      },
    });
    expect(wrapper.vm.isMenuOpen({ id: 'category' })).toBe(false);
    console.log(wrapper.html());
    wrapper.find('[data-test="categories-1st-level"] > li').trigger('mouseover');
    expect(wrapper.vm.isMenuOpen({ id: 'category' })).toBe(true);
  });
});
