export const SET_DATA_BY_SLUG = 'SET_DATA_BY_SLUG';

export function obtainDataBySlug(categories) {
  const dataBySlug = {};
  if (Array.isArray(categories)) {
    categories.forEach(({
      id, name, slug, ancestors, children,
    }) => {
      dataBySlug[slug] = ({
        id, name, slug, ancestors,
      });
      Object.assign(dataBySlug, obtainDataBySlug(children));
    });
  }
  return dataBySlug;
}

export default {
  state: {
    dataBySlug: {},
  },

  getters: {

  },

  actions: {
    setCategories: ({ commit }, categories) => {
      const dataBySlug = obtainDataBySlug(categories);
      commit(SET_DATA_BY_SLUG, dataBySlug);
    },
  },

  mutations: {
    [SET_DATA_BY_SLUG](state, dataBySlug) {
      state.dataBySlug = dataBySlug;
    },
  },
};
