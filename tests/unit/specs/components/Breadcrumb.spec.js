import { shallowMount } from '@vue/test-utils';
import Breadcrumb from '@/components/Breadcrumb.vue';

describe('Breadcrumb.vue', () => {
  let categoryBySlug;
  let options;

  beforeEach(() => {
    categoryBySlug = jest.fn();
    options = {
      methods: { categoryBySlug },
      stubs: { 'router-link': '<a/>' },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(Breadcrumb, options).isVueInstance()).toBeTruthy();
  });

  it('hides when there is no category information', () => {
    const wrapper = shallowMount(Breadcrumb, {
      ...options,
      methods: { categoryBySlug: () => null },
    });
    expect(wrapper.vm.active).toBeFalsy();
  });

  it('shows when there is category information', () => {
    const wrapper = shallowMount(Breadcrumb, {
      ...options,
      methods: { categoryBySlug: () => ({ }) },
    });
    expect(wrapper.vm.active).toBeTruthy();
  });

  it('obtains corresponding category information', () => {
    const wrapper = shallowMount(Breadcrumb, {
      ...options,
      propsData: { categorySlug: 'some-category-slug' },
    });

    // eslint-disable-next-line no-unused-vars
    const unused = wrapper.vm.category;
    expect(categoryBySlug).toHaveBeenCalledWith('some-category-slug');
  });
});
