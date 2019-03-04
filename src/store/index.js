import Vue from "vue";
import Vuex from "vuex";

import join from './join.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    join
  }
});
