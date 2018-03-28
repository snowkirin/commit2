import Vue from 'vue';
import Vuex from 'vuex';
import common from './common';
import login from './login';
import signup from './signup';
import mypage from './mypage';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    login,
    signup,
    mypage,
  },
});
