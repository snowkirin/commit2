import Http from '@/library/HTTP';

export default {
  GetMembership(data = 1) {
    return Http.get(`/payment/membership`, {
      params: {
        id: data
      }
    });
  },
  // getMembership() {
  //   return axios
  //     .get(`${API_URL}/payment/membership`, {
  //       params: {
  //         id: 1
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
