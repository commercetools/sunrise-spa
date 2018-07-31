import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Breadcrumb from '@/components/Breadcrumb.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Breadcrumb.vue', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        categories: {
          dataBySlug: {},
        },
      },
    });
  });

  it('renders a vue instance', () => {
    expect(shallowMount(Breadcrumb).isVueInstance()).toBeTruthy();
  });

  it('hides when there is no category information', () => {
    const wrapper = shallowMount(Breadcrumb, { localVue, store });
    expect(wrapper.vm.active).toBeFalsy();
    wrapper.setProps({ categorySlug: 'some-category' });
    expect(wrapper.vm.active).toBeTruthy();
  });

  it('obtains corresponding category information', () => {
    const category = { foo: 'bar' };
    store.state.categories.dataBySlug['some-category'] = category;
    const wrapper = shallowMount(Breadcrumb, { localVue, store });

    expect(wrapper.vm.category).toEqual({});
    wrapper.setProps({ categorySlug: 'some-category' });
    expect(wrapper.vm.category).toEqual(category);
    wrapper.setProps({ categorySlug: 'some-other-category' });
    expect(wrapper.vm.category).toEqual({});
  });
});
