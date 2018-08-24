import Vue from 'vue';
import Vuex from 'vuex';
import codes from './codes';
import common from './common';
import login from './login';
import signup from './signup';
import mypage from './mypage';
import member from './member';
import payment from './payment';
import auth from './auth';
import subscriptions from './subscriptions';
import notices from './notices';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    login,
    signup,
    mypage,
    member,
    codes,
    payment,
    auth,
    subscriptions,
    notices
  }
});
