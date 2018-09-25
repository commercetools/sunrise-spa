import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import categories from '@/store/modules/categories';
import { cloneDeep } from 'lodash';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('categoryMixin', () => {
  function generateCategory(index, ancestors, children) {
    return {
      id: `id${index}`,
      name: `name${index}`,
      slug: `slug${index}`,
      foo: 'bar',
      ancestors,
      children,
    };
  }

  function generateAncestor(index) {
    return {
      name: `name${index}`,
      slug: `slug${index}`,
    };
  }

  const grandchildCategory = generateCategory(3, [generateAncestor(2), generateAncestor(1)], []);
  const childCategory = generateCategory(2, [generateAncestor(1)], [grandchildCategory]);
  const rootCategory = generateCategory(1, [], [childCategory]);
  let config;

  beforeEach(() => {
    config = cloneDeep(categories);
  });

  it('has categories on empty items', () => {
    config.state.items = [];
    const store = new Vuex.Store(config);
    expect(store.getters.hasCategories).toBeFalsy();
  });

  it('does not have categories on non empty items', () => {
    config.state.items = [{}, {}];
    const store = new Vuex.Store(config);
    expect(store.getters.hasCategories).toBeTruthy();
  });

  it('does not have categories on non empty items', () => {
    config.state.items = [rootCategory];
    const store = new Vuex.Store(config);
    expect(store.getters.categoryTree).toEqual([rootCategory]);
  });

  it('returns structured categories by slug', () => {
    config.state.items = [rootCategory];
    const store = new Vuex.Store(config);
    expect(store.getters.categoryBySlug).toEqual({
      slug1: {
        id: 'id1',
        name: 'name1',
        slug: 'slug1',
        ancestors: [],
      },
      slug2: {
        id: 'id2',
        name: 'name2',
        slug: 'slug2',
        ancestors: [
          {
            name: 'name1',
            slug: 'slug1',
          },
        ],
      },
      slug3: {
        id: 'id3',
        name: 'name3',
        slug: 'slug3',
        ancestors: [
          {
            name: 'name2',
            slug: 'slug2',
          },
          {
            name: 'name1',
            slug: 'slug1',
          },
        ],
      },
    });
  });

  it('returns empty object on empty categories', () => {
    config.state.items = [];
    const store = new Vuex.Store(config);
    expect(store.getters.categoryBySlug).toEqual({});
  });
});
