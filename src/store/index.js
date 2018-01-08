import Vue from 'vue';
import Vuex from 'vuex';
import veeValidate from 'vee-validate';
import sidebar from './common/sidebar';
import story from './main/story';
import stylesurvey from './stylesurvey/survey';

Vue.use(Vuex);
Vue.use(veeValidate);

export default new Vuex.Store({
  modules: {
    sidebar,
    story,
    stylesurvey,
  },
});
