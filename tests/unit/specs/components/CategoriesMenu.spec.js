import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import CategoriesMenu from '@/components/CategoriesMenu.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('CategoriesMenu.vue', () => {
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

  let options;
  let getters;

  beforeEach(() => {
    getters = {
      hasCategories: () => true,
      categoryTree: jest.fn(),
    };
    options = {
      localVue,
      store: new Vuex.Store({
        modules: {
          categories: { getters },
        },
      }),
      mocks: {
        $t: jest.fn(),
        $apollo: {
          queries: {
            categories: { loading: false },
          },
        },
      },
      stubs: { 'router-link': '<a/>' },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(CategoriesMenu, options).isVueInstance()).toBeTruthy();
  });

  it('identifies sales category', () => {
    options.mocks.$sunrise = {
      categories: {
        salesExternalId: 'sale',
      },
    };
    const wrapper = shallowMount(CategoriesMenu, options);

    expect(wrapper.vm.isSale({ externalId: 'sale' })).toBeTruthy();
    expect(wrapper.vm.isSale({ externalId: 'not-sale' })).toBeFalsy();
    expect(wrapper.vm.isSale({})).toBeFalsy();
  });

  it('identifies sales category when no sales category is configured', () => {
    const wrapper = shallowMount(CategoriesMenu, options);
    expect(wrapper.vm.isSale({ externalId: 'sale' })).toBeFalsy();
  });

  it('decides a category without children should not be open', () => {
    const childlessCategory = { id: 'category-childless-id' };
    getters.categoryTree.mockReturnValue([childlessCategory]);
    const wrapper = shallowMount(CategoriesMenu, options);
    expect(wrapper.vm.isMenuOpen(childlessCategory)).toBeFalsy();

    wrapper.find('[data-test="category-1st-level"]').trigger('mouseover');
    expect(wrapper.vm.isMenuOpen(childlessCategory)).toBeFalsy();

    wrapper.find('[data-test="category-1st-level"]').trigger('mouseleave');
    expect(wrapper.vm.isMenuOpen(childlessCategory)).toBeFalsy();
  });

  it('decides when a category with children should be open', () => {
    getters.categoryTree.mockReturnValue([categoryWithChildren1, categoryWithChildren2]);
    const wrapper = shallowMount(CategoriesMenu, options);
    expect(wrapper.vm.isMenuOpen(categoryWithChildren1)).toBeFalsy();
    expect(wrapper.vm.isMenuOpen(categoryWithChildren2)).toBeFalsy();

    wrapper.find('[data-test="category-1st-level"]').trigger('mouseover');
    expect(wrapper.vm.isMenuOpen(categoryWithChildren1)).toBeTruthy();
    expect(wrapper.vm.isMenuOpen(categoryWithChildren2)).toBeFalsy();

    wrapper.find('[data-test="category-1st-level"]').trigger('mouseleave');
    expect(wrapper.vm.isMenuOpen(categoryWithChildren1)).toBeFalsy();
    expect(wrapper.vm.isMenuOpen(categoryWithChildren2)).toBeFalsy();
  });

  it('closes submenu when a 1st level category is clicked', () => {
    getters.categoryTree.mockReturnValue([categoryWithChildren1, categoryWithChildren2]);
    const wrapper = shallowMount(CategoriesMenu, options);
    expect(wrapper.vm.isMenuOpen(categoryWithChildren1)).toBeFalsy();

    wrapper.find('[data-test="category-1st-level"]').trigger('mouseover');
    expect(wrapper.vm.isMenuOpen(categoryWithChildren1)).toBeTruthy();

    wrapper.find('[data-test="category-1st-level-link"]').trigger('click');
    expect(wrapper.vm.isMenuOpen(categoryWithChildren1)).toBeFalsy();
  });

  it('closes submenu when 2nd level category is clicked', () => {
    getters.categoryTree.mockReturnValue([categoryWithChildren1, categoryWithChildren2]);
    const wrapper = shallowMount(CategoriesMenu, options);
    expect(wrapper.vm.isMenuOpen(categoryWithChildren1)).toBeFalsy();

    wrapper.find('[data-test="category-1st-level"]').trigger('mouseover');
    expect(wrapper.vm.isMenuOpen(categoryWithChildren1)).toBeTruthy();

    wrapper.find('[data-test="category-2nd-level-link"]').trigger('click');
    expect(wrapper.vm.isMenuOpen(categoryWithChildren1)).toBeFalsy();
  });

  it('closes submenu when 3rd level category is clicked', () => {
    getters.categoryTree.mockReturnValue([categoryWithChildren1, categoryWithChildren2]);
    const wrapper = shallowMount(CategoriesMenu, options);
    expect(wrapper.vm.isMenuOpen(categoryWithChildren1)).toBeFalsy();

    wrapper.find('[data-test="category-1st-level"]').trigger('mouseover');
    expect(wrapper.vm.isMenuOpen(categoryWithChildren1)).toBeTruthy();

    wrapper.find('[data-test="category-3rd-level-link"]').trigger('click');
    expect(wrapper.vm.isMenuOpen(categoryWithChildren1)).toBeFalsy();
  });
});
