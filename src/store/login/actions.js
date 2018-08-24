import Auth from "@/library/api/auth";
import types from "./mutation-types";

export default {
  doLogin({commit}, data) {
    return Auth.postLogin(data)
      .then(res => {
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
  doLogout({commit}) {
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
  }
};
