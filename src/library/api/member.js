import Http from '@/library/HTTP';

import axios from 'axios';
const API_URL = process.env.VUE_APP_API_URL;

export default {
  getMemberCount() {
    return axios
      .get(`${API_URL}/member/count`)
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
  // 2018-08-21 수정
  getMemberStyle() {
    return axios
      .get(`${API_URL}/member/style`, {
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
  // 2018-08-21 수정 END

  patchMemberPassword(data) {
    const result = axios
      .patch(`${API_URL}/member/password`, data, { withCredentials: true })
      .then(res => {
        return res;
      })
      .catch(err => {
        alert(err);
        return err;
      });
    return result;
  },
  postMemberImages(data) {
    return axios
      .post(`${API_URL}/member/images`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
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
  postMemberStyle(data) {
    return axios
      .post(`${API_URL}/member/style`, data, {
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
  postMemberImageStyle(imageData, styleData) {
    return axios
      .all([this.postMemberImages(imageData), this.postMemberStyle(styleData)])
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
  patchMeberStyle(data) {
    return axios
      .patch(`${API_URL}/member/style`, data, {
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
  patchMemberImageStyle(imageData, styleData) {
    return axios
      .all([this.postMemberImages(imageData)], this.patchMeberStyle(styleData))
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
  getMemberStyleType() {
    return axios
      .get(`${API_URL}/member/styletype`)
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

  getMypage() {
    return axios
      .get(`${API_URL}/member/mypage`, {
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
  // 핸드폰 번호 변경시
  postPhone(data) {
    return axios
      .post(`${API_URL}/member/phone`, data, {
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
  patchPhone(data) {
    return axios
      .patch(`${API_URL}/member/phone`, data, {
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
  patchPayment(data) {
    return axios
      .patch(`${API_URL}/member/payment`, data, {
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
  patchAddress(data) {
    return axios
      .patch(`${API_URL}/member/address`, data, {
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
  patchLobbyPassword(data) {
    return axios
      .patch(`${API_URL}/member/addrPassword `, data, {
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
  patchAnn(data) {
    return axios
      .patch(`${API_URL}/member/memorialDay`, data, {
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
  patchPassword(data) {
    return axios
      .patch(`${API_URL}/member/password`, data, {
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
  // postCancel(data) {
  //   return axios
  //     .post(`${API_URL}/member/cancel`, data, {
  //       withCredentials: true
  //     })
  //     .then(res => {
  //       return res;
  //     })
  //     .catch(err => {
  //       return {
  //         ...err.response,
  //         message: err.message
  //       };
  //     });
  // },
  getPaymentSubscribeCustomer() {
    return axios
      .get(`${API_URL}/member/payment/subscribe-customer`, {
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

  GetStyleType() {
    return Http.get('/member/styletype');
  },
  PostAddInfo(data) {
    return Http.post(`/member/style`, data, {
      withCredentials: true
    });
  },
  PostImages(data) {
    return Http.post('/member/images', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    });
  },
  GetStyleInfo() {
    return Http.get('/member/style', {
      withCredentials: true
    });
  },
  PatchStyleInfo(data) {
    return Http.patch('/member/style', data, {
      withCredentials: true
    });
  },
  PostCancel(data) {
    return Http.post('/member/cancel', data, {
      withCredentials: true
    });
  },

  GetMyPage() {
    return Http.get('/member/mypage', {
      withCredentials: true
    });
  }
};
