import Auth from '@/library/api/auth';
import Member from '@/library/api/member';
import types from './mutation-types';
import {Base64} from "js-base64";

export default {
  doLogin({ commit }, data) {
    return Auth.postLogin(data).then(res => {
      if (res.data.result) {
        commit(types.LOGIN_SUCCESS, res.data);
      } else if (!res.data.result) {
        console.log('로그인 실패');
      } else {
        if (res.data.errorMessage) {
          const errorMessage = JSON.stringify(res.data.errorMessage.details);
          console.error(errorMessage);
        } else {
          console.error(res.message);
        }
      }
      return res;
    });
  },
  doLogout({ commit }) {
    return Auth.postLogout().then(res => {
      if (res.data.result) {
        commit(types.LOGOUT);
      } else if (!res.data.result) {
        console.log('로그아웃 실패');
      } else {
        if (res.data.errorMessage) {
          const errorMessage = JSON.stringify(res.data.errorMessage.details);
          console.error(errorMessage);
        } else {
          console.error(res.message);
        }
      }
      return res;
    });
  },
  changeUserType({ commit }, data) {
    commit(types.CHANGE_USER_TYPE, data);
    // return Member.postCancel(data).then(res => {
    //   if (res.data.result) {
    //
    //     return res;
    //   }
    // });
  },

  /*
  * 구독 중지 및 회원 탈퇴
  * reqType = 15101(구독중지), 15102(회원탈퇴)
  * */
  postCancel({ commit }, data) {
    return Member.postCancel(data).then(res => {
      if (res.data.result) {
        return res;
      } else {
        return res;
      }
    });
  }
};
