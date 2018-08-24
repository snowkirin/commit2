// import axios from '@/library/HTTP';
import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;

export default {
  getSizes() {
    return axios
      .get(`${API_URL}/code/customer/sizes`)
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
  getFirstDeliveryDays() {
    return axios
      .get(`${API_URL}/calendar/firstdeliverydays`)
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
  getMembership() {
    return axios
      .get(`${API_URL}/payment/membership`, {
        params: {
          id: 1
        }
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
  getRecommendCode(membership, codeData) {
    return axios
      .get(`${API_URL}/payment/recommendCode`, {
        params: {
          id: membership,
          code: codeData
        }
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
  getOptions() {
    /*
    * 옵션 코드 가져오기
    * path: join/addinfo
    * */
    return axios
      .get(`${API_URL}/code/customer/options`, {
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
  }
};

// async function getSizes() {
//   try {
//     const result = await axios.get(`${API_URL}/code/customer/sizes`);
//     return result;
//   } catch (err) {
//     console.error(err);
//   }
// }
// async function getFirstDeliveryDays() {
//   try {
//     const result = await axios.get(`${API_URL}/calendar/firstdeliverydays`);
//     return result;
//   } catch (err) {
//     console.error(err);
//   }
// }
// async function getRecommendCode(membership, codeData) {
//   try {
//     const result = axios.get(`${API_URL}/payment/recommendCode`, {
//       params: {
//         id: membership,
//         code: codeData,
//       }
//     }).then(function(res) {
//       return res;
//     }).catch(function(error) {
//       return error;
//     });
//     return result;
//   } catch (err) {
//     console.error(err);
//   }
// };
// async function getMembership() {
//   try {
//     const result = axios.get(`${API_URL}/payment/membership`, {
//       params: {
//         // 오픈베타 동안 멤버쉽은 1로 고정
//         id: 1,
//       }
//     }).then(function(res) {
//       return res;
//     }).catch(function(error) {
//       return error;
//     });
//     return result;
//   } catch (err) {
//     console.error(err);
//   }
// }
//
// async function getOptions() {
//   try {
//     const result = axios.get(`${API_URL}/code/customer/options`, {
//       withCredentials: true,
//     }).then(function(res) {
//       return res;
//     }).catch(function(error) {
//       return error;
//     });
//     return result;
//   } catch (err) {
//     console.error(err);
//   }
// }
// function postMemberImages(data) {
//   const result = axios.post(`${API_URL}/member/images`, data,
//     {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//       withCredentials: true,
//     })
//     .then(function(res) {
//       return res;
//     })
//     .catch(function(err) {
//       return err;
//     });
//   return result;
// }
// function postMemberStyle(data) {
//   const result = axios.post(`${API_URL}/member/style`, data, {
//       withCredentials: true,
//     })
//     .then(function(res) {
//       return res;
//     })
//     .catch(function(err) {
//       return err;
//     });
//   return result;
// }
// async function postMemberImageStyle(imageData, styleData) {
//   try {
//     const result = axios.all([postMemberImages(imageData), postMemberStyle(styleData)])
//       .then(axios.spread(function(acct,perms) {
//       }));
//     return result;
//   } catch(err) {
//     console.log(err);
//   }
// }
//
// function patchMeberStyle(data) {
//   const result = axios.patch(`${API_URL}/member/style`, data, {
//     withCredentials: true,
//   }).then((res) => {
//     return res;
//   }).catch((err) => {
//     return err;
//   });
//   return result;
// }
//
// function patchMemberImageStyle(styleData, imageData) {
//   const result = axios.all([patchMeberStyle(styleData), postMemberImages(imageData)])
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       alert(err);
//       return err;
//     });
//   return result;
// }
//
// export default {
//   getSize,
//   getFirstDeliveryDays,
//   getRecommendCode,
//   getMembership,
//   getOptions,
//   postMemberImages,
//   postMemberStyle,
//   postMemberImageStyle,
//   patchMemberImageStyle,
//   patchMeberStyle,
// };
