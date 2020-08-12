import { shallowMount } from '@vue/test-utils';
import Breadcrumb from '@/components/common/Breadcrumb/Breadcrumb.vue';

describe('Breadcrumb/index.vue', () => {
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
    expect(shallowMount(Breadcrumb, options).vm).toBeTruthy();
  });

  it('obtains category information', async () => {
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
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.currentCategory).toEqual(someCategory);
  });
});
