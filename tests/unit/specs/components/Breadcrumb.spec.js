import { shallowMount } from '@vue/test-utils';
import Breadcrumb from '@/components/Breadcrumb.vue';

describe('Breadcrumb.vue', () => {
  let options;

  beforeEach(() => {
    options = {
      methods: { categoryBySlug: jest.fn() },
      mocks: { $t: jest.fn() },
      stubs: { 'router-link': '<a/>' },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(Breadcrumb, options).isVueInstance()).toBeTruthy();
  });

  it('hides when there is no category information', () => {
    options.methods.categoryBySlug = () => null;
    const wrapper = shallowMount(Breadcrumb, options);

    expect(wrapper.vm.active).toBeFalsy();
  });

  it('shows when there is category information', () => {
    options.methods.categoryBySlug = () => ({ });
    const wrapper = shallowMount(Breadcrumb, options);

    expect(wrapper.vm.active).toBeTruthy();
  });

  it('obtains corresponding category information', () => {
    const wrapper = shallowMount(Breadcrumb, options);
    wrapper.setProps({ categorySlug: 'some-category-slug' });

    // eslint-disable-next-line no-unused-vars
    const unused = wrapper.vm.category;
    expect(options.methods.categoryBySlug).toHaveBeenCalledWith('some-category-slug');
  });
});
