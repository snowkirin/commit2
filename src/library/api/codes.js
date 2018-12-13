import Http from '@/library/HTTP';

export default {
  /*
  * 사이즈 목록 가져오기
  * */
  GetSizes() {
    return Http.get(`/code/customer/sizes`);
  },
  /*
  * 연령대 목록 가져오기
  * */
  GetAges() {
    return Http.get(`/code/customer/ages`);
  },
  /*
  * 고객 추가 정보 목록 가져오기
  * */
  GetOptions() {
    return Http.get(`/code/customer/options`);
  },
  /*
  * 주소 검증
  * */
  GetZipCodes(data) {
    return Http.get(`/code/address/zipcodes`, {
      params: {
        zipcode: data
      }
    });
  },

  // getSizes() {
  //   return axios
  //     .get(`${API_URL}/code/customer/sizes`)
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

  // getOptions() {
  //   return axios
  //     .get(`${API_URL}/code/customer/options`, {
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

  // Calendar

  // getFirstDeliveryDays(data) {
  //   return axios
  //     .get(`${API_URL}/calendar/firstdeliverydays`, {
  //       params: {
  //         schymd: data
  //       }
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
  // getChangeDeliveryDays(data) {
  //   return axios
  //     .get(`${API_URL}/calendar/changeDeliveryDays`, {
  //       withCredentials: true,
  //       params: {
  //         schymd: data
  //       }
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
};
