import { obtainDataBySlug } from '@/store/modules/categories';

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


  it('structures category data', () => {
    const dataBySlug = obtainDataBySlug([rootCategory]);
    expect(dataBySlug).toEqual({
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

  it('structures empty category list', () => {
    const dataBySlug = obtainDataBySlug([]);
    expect(dataBySlug).toEqual({});
  });
});
