import { shallowMount, createLocalVue } from '@vue/test-utils';
import ProductSorting from '@/components/productoverview/ProductSorting.vue';
import VueRouter from 'vue-router';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('ProductSorting.vue', () => {
  let options;

  beforeEach(() => {
    options = {
      router,
      localVue,
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(ProductSorting, options).isVueInstance()).toBeTruthy();
  });

  it('changes query in router', () => {
    const wrapper = shallowMount(ProductSorting, options);
    expect(wrapper.vm.sortBy).toEqual('');
    wrapper.setData({
      sortBy: 'newest',
    });
    expect(window.location.href).toContain('?sort=newest');
    wrapper.setData({
      sortBy: 'oldest',
    });
    expect(window.location.href).toContain('?sort=oldest');
  });
});
