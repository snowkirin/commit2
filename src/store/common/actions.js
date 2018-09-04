import Auth from '@/library/api/auth';
import types from './mutation-types';

export default {
  // 삭제 예정
  phoneVerify({commit}, data) {
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
  phonePasswordVerify({ commit }, data) {
    try {
      commit(types.PHONE_VERIFY_COUNT_PWD);

      const result = Auth.authFindPwd({
        ...data
      });

      commit(types.PHONE_VERIFY_PWD, result.data);
    } catch (e) {
      console.error(e.message);
    }
  },
  phonePasswordCheckVerify({ state, commit }, data) {
    try {
      const result = Auth.finalAuth({
        authId: state.phonePwdAuthKey,
        ...data
      });

      commit(types.PHONE_VERIFY_CHECK_PWD, result.data);
    } catch (e) {
      console.error(e.message);
    }
  },
  changePassword({ commit, state }, data) {
    try {
      const result = Auth.findPwdComplete({
        authId: state.phonePwdAuthKey,
        ...data
      });

      if (result.data.result) commit(types.PHONE_VERIFY_PWD_COMPLETE);
      else alert('비밀번호 변경에 실패하였습니다.\n관리자에게 문의해주세요.');
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
  }
};