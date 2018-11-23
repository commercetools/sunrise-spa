import { shallowMount } from '@vue/test-utils';
import Breadcrumb from '@/components/Breadcrumb.vue';

describe('Breadcrumb.vue', () => {
  const someCategory = {
    id: 'some-id',
    ancestors: [],
  };

  let options;

  beforeEach(() => {
    options = {
      mocks: { $t: jest.fn() },
      stubs: { 'router-link': true },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(Breadcrumb, options).isVueInstance()).toBeTruthy();
  });

  it('obtains category', () => {
    const wrapper = shallowMount(Breadcrumb, options);
    wrapper.setData({
      categories: {
        results: [],
      },
    });
    expect(wrapper.vm.category).toBeUndefined();

    wrapper.setData({
      categories: {
        results: [someCategory],
      },
    });
    expect(wrapper.vm.category).toEqual(someCategory);
  });
});
