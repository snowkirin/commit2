export default {
  state: {
    storyView: 'StoryAbout',
    isAbout: true,
    isProcess: false,
    isPrice: false,
  },

  mutations: {
    SET_STORY_VIEW(state, targetView) {
      state.isAbout = false;
      state.isProcess = false;
      state.isPrice = false;

      if (targetView === 'About') {
        state.isAbout = true;
        state.storyView = 'StoryAbout';
      } else if (targetView === 'Process') {
        state.isProcess = true;
        state.storyView = 'StoryProcess';
      } else if (targetView === 'Price') {
        state.isPrice = true;
        state.storyView = 'StoryPrice';
      } else {
        state.isAbout = true;
        state.storyView = 'StoryAbout';
      }
    },
  },

  actions: {
    setStoryView({ commit }, targetView) {
      commit('SET_STORY_VIEW', targetView);
    },
  },

  getters: {
    getStoryView: state => state.storyView,
    isAbout: state => state.isAbout,
    isProcess: state => state.isProcess,
    isPrice: state => state.isPrice,
  },
};
