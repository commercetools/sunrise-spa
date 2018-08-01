import categoryMixin from '@/mixins/categoryMixin';

describe('categoryMixin', () => {
  describe('given store contains some categories', () => {
    const category1 = { id: 'id1' };
    const category2 = { id: 'id2' };

    const $store = {
      $store: {
        state: {
          categories: {
            dataBySlug: {
              slug1: category1,
              slug2: category2,
            },
          },
        },
      },
    };

    Object.assign(categoryMixin.methods, $store);

    it('returns category with the given slug', () => {
      expect(categoryMixin.methods.categoryBySlug('slug2')).toEqual(category2);
    });

    it('returns nothing when slug is not there', () => {
      expect(categoryMixin.methods.categoryBySlug('no-exist')).toBeUndefined();
    });
  });
});
