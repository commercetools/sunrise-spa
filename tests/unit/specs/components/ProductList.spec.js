import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ProductList from '@/components/ProductList.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ProductList.vue', () => {
  let categoryBySlug;

  beforeEach(() => {
    categoryBySlug = jest.fn();
  });

  it('renders a vue instance', () => {
    expect(shallowMount(ProductList).isVueInstance()).toBeTruthy();
  });

  it('obtains corresponding category information', () => {
    const wrapper = shallowMount(ProductList, {
      propsData: { categorySlug: 'some-category-slug' },
      methods: { categoryBySlug },
      stubs: { 'router-link': '<a/>' },
    });

    // eslint-disable-next-line no-unused-vars
    const unused = wrapper.vm.category;
    expect(categoryBySlug).toHaveBeenCalledWith('some-category-slug');
  });
});
