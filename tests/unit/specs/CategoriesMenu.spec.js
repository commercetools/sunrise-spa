import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import CategoriesMenu from '@/components/CategoriesMenu.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('CategoriesMenu.vue', () => {
  it('renders a vue instance', () => {
    expect(shallowMount(CategoriesMenu).isVueInstance()).toBe(true);
  });

  it('identifies sales category', () => {
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
    expect(wrapper.vm.isSale({ externalId: 'not-sale' })).toBe(false);
    expect(wrapper.vm.isSale({})).toBe(false);
  });

  it('identifies sales category when no sales category is configured', () => {
    const wrapper = shallowMount(CategoriesMenu);
    expect(wrapper.vm.isSale({ externalId: 'sale' })).toBe(false);
  });

  describe('given it has 2 categories with children', () => {
    const categoryWithChildren1 = {
      id: 'category-children-1-id',
      children: [
        {
          id: 'subcategory-children-1-id',
          children: [{ id: 'sub-subcategory-children-1-id' }],
        },
      ],
    };

    const categoryWithChildren2 = {
      id: 'category-children-2-id',
      children: [{ id: 'subcategory-children-2-id' }],
    };

    let actions;
    let store;
    let wrapper;

    beforeEach(() => {
      actions = {
        setCategories: jest.fn(),
      };
      store = new Vuex.Store({
        state: {},
        actions,
      });
      wrapper = shallowMount(CategoriesMenu, {
        localVue,
        store,
        stubs: { 'router-link': '<a></a>' },
      });
      wrapper.setData({
        categories: {
          results: [categoryWithChildren1, categoryWithChildren2],
        },
      });
    });

    it('dispatches "setCategories" action when categories change', () => {
      expect(actions.setCategories).toHaveBeenCalled();
    });

    it('hides when there are no categories', () => {
      expect(wrapper.vm.active).toBe(true);
      wrapper.vm.$set(wrapper.vm, 'categories', {});
      expect(wrapper.vm.active).toBe(false);
      wrapper.setData({ categories: { results: [] } });
      expect(wrapper.vm.active).toBe(false);
    });

    it('decides when a category with children should be open', () => {
      expect(wrapper.vm.isMenuOpen(categoryWithChildren1)).toBe(false);
      expect(wrapper.vm.isMenuOpen(categoryWithChildren2)).toBe(false);
      wrapper.find('[data-test="category-1st-level"]').trigger('mouseover');
      expect(wrapper.vm.isMenuOpen(categoryWithChildren1)).toBe(true);
      expect(wrapper.vm.isMenuOpen(categoryWithChildren2)).toBe(false);
      wrapper.find('[data-test="category-1st-level"]').trigger('mouseleave');
      expect(wrapper.vm.isMenuOpen(categoryWithChildren1)).toBe(false);
      expect(wrapper.vm.isMenuOpen(categoryWithChildren2)).toBe(false);
    });

    it('decides a category without children should not be open', () => {
      const childlessCategory = { id: 'category-childless-id' };
      wrapper.setData({
        categories: {
          results: [childlessCategory],
        },
      });
      expect(wrapper.vm.isMenuOpen(childlessCategory)).toBe(false);
      wrapper.find('[data-test="category-1st-level"]').trigger('mouseover');
      expect(wrapper.vm.isMenuOpen(childlessCategory)).toBe(false);
      wrapper.find('[data-test="category-1st-level"]').trigger('mouseleave');
      expect(wrapper.vm.isMenuOpen(childlessCategory)).toBe(false);
    });

    it('closes submenu when a 1st level category is clicked', () => {
      expect(wrapper.vm.isMenuOpen(categoryWithChildren1)).toBe(false);
      wrapper.find('[data-test="category-1st-level"]').trigger('mouseover');
      expect(wrapper.vm.isMenuOpen(categoryWithChildren1)).toBe(true);
      wrapper.find('[data-test="category-1st-level-link"]').trigger('click');
      expect(wrapper.vm.isMenuOpen(categoryWithChildren1)).toBe(false);
    });

    it('closes submenu when 2nd level category is clicked', () => {
      expect(wrapper.vm.isMenuOpen(categoryWithChildren1)).toBe(false);
      wrapper.find('[data-test="category-1st-level"]').trigger('mouseover');
      expect(wrapper.vm.isMenuOpen(categoryWithChildren1)).toBe(true);
      wrapper.find('[data-test="category-2nd-level-link"]').trigger('click');
      expect(wrapper.vm.isMenuOpen(categoryWithChildren1)).toBe(false);
    });

    it('closes submenu when 3rd level category is clicked', () => {
      expect(wrapper.vm.isMenuOpen(categoryWithChildren1)).toBe(false);
      wrapper.find('[data-test="category-1st-level"]').trigger('mouseover');
      expect(wrapper.vm.isMenuOpen(categoryWithChildren1)).toBe(true);
      wrapper.find('[data-test="category-3rd-level-link"]').trigger('click');
      expect(wrapper.vm.isMenuOpen(categoryWithChildren1)).toBe(false);
    });
  });
});
