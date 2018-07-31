import { shallowMount } from '@vue/test-utils';
import Breadcrumb from '@/components/Breadcrumb.vue';

describe('Breadcrumb.vue', () => {
  let categoryBySlug;

  beforeEach(() => {
    categoryBySlug = jest.fn();
  });

  it('renders a vue instance', () => {
    expect(shallowMount(Breadcrumb).isVueInstance()).toBeTruthy();
  });

  it('hides when there is no category information', () => {
    const wrapper = shallowMount(Breadcrumb, { methods: { categoryBySlug } });
    expect(wrapper.vm.active).toBeFalsy();
    wrapper.setProps({ categorySlug: 'some-category' });
    expect(wrapper.vm.active).toBeTruthy();
  });

  it('obtains corresponding category information', () => {
    const wrapper = shallowMount(Breadcrumb, {
      propsData: { categorySlug: 'some-category-slug' },
      methods: { categoryBySlug },
      stubs: { 'router-link': '<a/>' },
    });

    // eslint-disable-next-line no-unused-vars
    const unused = wrapper.vm.category;
    expect(categoryBySlug).toHaveBeenCalledWith('some-category-slug');
  });
});
