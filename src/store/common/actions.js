import CodesAPI from '@/library/api/codes';
import Auth from '@/library/api/auth';
import types from './mutation-types';

export default {
  FETCH_FAILED() {

  },

  FETCH_SIZES(context) {
    CodesAPI.GetSizes()
      .then(({ data }) => {
        context.commit(types.SET_SIZES, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  FETCH_OPTIONS(context) {
    CodesAPI.GetOptions()
      .then(({ data }) => {
        context.commit(types.SET_OPTIONS, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  },

  // 삭제 예정
  phoneVerify({ commit }, data) {
    try {
      commit(types.PHONE_VERIFY_COUNT);

      const result = Auth.authFindId({
        ...data
      });

      commit(types.PHONE_VERIFY, result.data);
    } catch (e) {
      console.error(e.message);
    }
  },
  phoneCheckVerify({ state, commit }, data) {
    try {
      const result = Auth.finalAuth({
        authId: state.phoneAuthKey,
        ...data
      });

      commit(types.PHONE_VERIFY_CHECK, result.data);
    } catch (e) {
      console.error(e.message);
    }
  },
  // 삭제예정

  /*
  * data = boolean (true, false)
  * */
  toggleMainBanner({ commit }, data) {
    commit(types.TOGGLE_MAIN_BANNER, data);
  },
  checkCurrentRoute({ commit }, data) {
    commit(types.CHECK_CURRENT_ROUTE, data);
  },
  successRestart({ commit }) {
    commit(types.SUCCESS_RESTART);
  },
  resetRestart({ commit }) {
    commit(types.RESET_RESTART);
  }
};
