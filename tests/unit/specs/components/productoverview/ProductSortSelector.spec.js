import Vue from 'vue';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ProductSortSelector from '@/components/productoverview/ProductSortSelector.vue';
import SelectBoxIt from '@/components/common/form/SelectBoxIt.vue';

Vue.component('SelectBoxIt', SelectBoxIt);
const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('ProductSortSelector.vue', () => {
  let options;

  beforeEach(() => {
    options = {
      mocks: {
        $t: jest.fn(),
      },
      router,
      localVue,
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(ProductSortSelector, options).isVueInstance()).toBeTruthy();
  });

  it('changes query in router', () => {
    const wrapper = shallowMount(ProductSortSelector, options);
    wrapper.setData({
      sort: 'newest',
    });
    expect(wrapper.vm.$route.query).toEqual({ sort: 'newest' });
    wrapper.setData({
      sort: 'oldest',
    });
    expect(wrapper.vm.$route.query).toEqual({ sort: 'oldest' });
  });

  it('does not affect other query params', () => {
    const wrapper = shallowMount(ProductSortSelector, options);
    router.replace({ query: { size: 'M', color: 'red' } });
    wrapper.setData({
      sort: 'newest',
    });
    expect(wrapper.vm.$route.query).toEqual({ size: 'M', color: 'red', sort: 'newest' });
    wrapper.setData({
      sort: null,
    });
    expect(wrapper.vm.$route.query).toEqual({ size: 'M', color: 'red' });
  });
});
