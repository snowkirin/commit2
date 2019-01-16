import Vue from 'vue';
import Vuex from 'vuex';

import common from './common';
import join from './join';
import closet from './closet';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    join,
    closet
  }
});
