import axios from "axios";
const API_URL = process.env.VUE_APP_API_URL;

export default {
  postLogin(data) {
    return axios
      .post(`${API_URL}/auth/login`, data, {
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
  postJoin(data) {
    return axios
      .post(`${API_URL}/auth/join`, data, {
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
  postLogout() {
    return axios
      .post(`${API_URL}/auth/logout`, {
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
  // 회원가입시 핸드폰 인증
  postPhone(data) {
    return axios
      .post(`${API_URL}/auth/phone`, data)
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
  // 회원가입시 핸드폰 인증 체크
  patchPhone(data) {
    return axios
      .patch(`${API_URL}/auth/phone`, data)
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
  postPassword(data) {
    return axios
      .post(`${API_URL}/auth/password`, data, {
        withCredentials: true
      })
      .then(res => {
        console.log(res);
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
