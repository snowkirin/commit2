import axios from 'axios';
import Http from '@/library/HTTP';

const API_URL = process.env.VUE_APP_API_URL;

export default {
  PostJoin(data) {
    return Http.post(`/auth/join`, data, { withCredentials: true });
  },
  PostLogin(data) {
    return Http.post(`/auth/login`, data, { withCredentials: true });
  },
  PostLogout() {
    return Http.post(`/auth/logout`, { withCredentials: true });
  },
  // GetCheckLogin() {
  //   return Http.get('/auth/checkLoginStatus', { withCredentials: true });
  // },
  PostPhone(data) {
    return Http.post('/auth/phone', data);
  },
  PatchPhone(data) {
    return Http.patch('/auth/phone', data);
  },
  // PostFindId(data) {
  //   return Http.post('/auth/findId', data);
  // },
  // PostFindPwd(data) {
  //   return Http.post('/auth/findPwd', data);
  // },
  postPassword(data) {
    return axios
      .post(`${API_URL}/auth/password`, data, {
        withCredentials: true
      })
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  },

  // 아이디 찾기
  postFindId(data) {
    return axios
      .post(`${API_URL}/auth/findId`, data)
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  },
  // 아이디, 비밀번호  폰인증
  postFindAuth(data) {
    return axios
      .post(`${API_URL}/auth/find/auth`, data)
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  },

  // 비밀번호 찾기
  postFindPwd(data) {
    return axios
      .post(`${API_URL}/auth/findPwd`, data)
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  },
  // 비밀번호 찾기 변경
  postPasswordComplete(data) {
    return axios
      .post(`${API_URL}/auth/password/complete`, data)
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  }
};
