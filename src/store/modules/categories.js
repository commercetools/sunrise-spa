export const SET_SLUG_TO_ID = 'SET_SLUG_TO_ID';

function obtainSlugToId(categories) {
  const slugToId = {};
  if (Array.isArray(categories)) {
    categories.forEach(({ id, slug, children }) => {
      slugToId[slug] = id;
      Object.assign(slugToId, obtainSlugToId(children));
    });
  }
  return slugToId;
}

export default {
  state: {
    slugToId: {},
  },

  getters: {

  },

  actions: {
    setCategories: ({ commit }, categories) => {
      const slugToId = obtainSlugToId(categories.results);
      commit(SET_SLUG_TO_ID, slugToId);
    },
  },

  mutations: {
    [SET_SLUG_TO_ID](state, slugToId) {
      state.slugToId = slugToId;
    },
  },
};
