import * as types from '../mutation-types';

export default {
  state: {
    storyView: 'StoryAbout',
    isAbout: true,
    isProcess: false,
    images: null,
  },

  mutations: {
    [types.SET_STORY_VIEW](state, targetView) {
      state.isAbout = false;
      state.isProcess = false;

      if (targetView === 'About') {
        state.isAbout = true;
        state.storyView = 'StoryAbout';
      } else if (targetView === 'Process') {
        state.isProcess = true;
        state.storyView = 'StoryProcess';
      } else {
        state.isAbout = true;
        state.storyView = 'StoryAbout';
      }
    },
    [types.SET_MAIN_PROCESS_IMAGE_LIST](state, images) {
      state.images = images;
    },
  },

  actions: {
    setStoryView({ commit }, targetView) {
      commit(types.SET_STORY_VIEW, targetView);
    },
    setMainProcessImageList({ commit }) {
      const images = {
        image1: '/src/assets/suzy.jpg',
        image2: '/src/assets/suzy.jpg',
        image3: '/src/assets/suzy.jpg',
        image4: '/src/assets/suzy.jpg',
      };
      commit(types.SET_MAIN_PROCESS_IMAGE_LIST, images);
    },
  },

  getters: {
    getStoryView: state => state.storyView,
    isAbout: state => state.isAbout,
    isProcess: state => state.isProcess,
    images: state => state.images,
  },
};
