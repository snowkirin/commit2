import Auth from '@/library/api/auth';
import types from './mutation-types';

const doLogin = async ({ commit }, loginInfo) => {
  try {
    const result = await Auth.localLogin({
      ...loginInfo,
    });

    if (result.data.result) commit(types.LOGIN_SUCCESS, result.data);
    else commit(types.LOGIN_FAILURE);
  } catch (e) {
    commit(types.LOGIN_ERROR, e.message);
  }
};

const doLogout = async () => { await Auth.logout(); };
const doCheckEmail = async () => { await Auth.checkEmail(); };
const loginStatusCheck = async ({ commit }) => {
  try {
    const result = await Auth.loginStatusCheck();

    if (result.data.result) commit(types.LOGIN_SUCCESS);
    else commit(types.LOGIN_FAILURE);
  } catch (e) {
    if (e.message.indexOf('status code 401') !== -1) ;
    else commit(types.LOGIN_ERROR, e.message);
  }
};

export default {
  doLogin,
  doLogout,
  doCheckEmail,
  loginStatusCheck,
};
