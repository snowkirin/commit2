import Vue from 'vue';
import Vuex from 'vuex';

import codes from './codes';
import common from './common';
import login from './login';
import signup from './signup';
import member from './member';
import payment from './payment';
import auth from './auth';
import subscriptions from './subscriptions';
import notices from './notices';
import faq from './faq';

// 신규 추가
import join from './join';
import closet from './closet';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    login,
    signup,
    member,
    codes,
    payment,
    auth,
    subscriptions,
    notices,
    faq,
    join,
    closet
  }
});
