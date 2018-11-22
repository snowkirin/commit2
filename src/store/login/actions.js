import Auth from '@/library/api/auth';
import Member from '@/library/api/member';
import types from './mutation-types';

export default {
  LOGIN(context, data) {
    return new Promise((resolve, reject) => {
      Auth.PostLogin(data)
        .then(({ data }) => {
          context.commit(types.LOGIN_SUCCESS, data);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  LOGOUT(context) {
    return new Promise(resolve => {
      Auth.PostLogout().then(({ data }) => {
        context.commit(types.LOGOUT_SUCCESS);
        resolve(data);
      });
    });
  },
  changeUserType({ commit }, data) {
    commit(types.CHANGE_USER_TYPE, data);
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
