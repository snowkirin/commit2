import Vue from 'vue';
import Vuex from 'vuex';

import common from './common';
import login from './login';
import join from './join';
import closet from './closet';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    login,
    join,
    closet
  }
});
