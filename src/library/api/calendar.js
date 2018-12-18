import Http from '@/library/HTTP';

export default {
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

  /*
  * 첫 배송 가능 요일 목록
  * */
  GetFirstDeliveryDays(data) {
    return Http.get(`/calendar/firstdeliverydays`, {
      params: {
        schymd: data
      }
    });
  },
  /*
  * 배송일 변경 가능 요일 목록
  * */
  GetChangeDeliveryDays(data) {
    return Http.get(`/calendar/changeDeliveryDays`, {
      withCredentials: true,
      params: {
        schymd: data
      }
    });
  }
}