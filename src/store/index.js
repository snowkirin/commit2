import Vue from 'vue';
import Vuex from 'vuex';
import sidebar from './common/sidebar';
import story from './main/story';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    sidebar,
    story,
  },
});
