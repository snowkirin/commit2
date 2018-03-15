import Vue from 'vue';
import Vuex from 'vuex';
import login from './login';
import signup from './signup';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    signup,
  },
});
