import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ProductSortSelector from '@/components/productoverview/TopBar/TopBar.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('ProductSortSelector/index.vue', () => {
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
    expect(shallowMount(ProductSortSelector, options).vm).toBeTruthy();
  });
});
