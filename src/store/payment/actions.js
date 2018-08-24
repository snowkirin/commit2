import Payment from "@/library/api/payment";
import types from "./mutation-types";

export default {
  getMembership({commit}) {
    return Payment.getMembership()
      .then(res => {
        if (res.data.result || res.status === 200) {
          commit(types.GET_MEMBERSHIP, res.data.data);
        }
        else {
          if (res.data.errorMessage) {
            const errorMessage = JSON.stringify(res.data.errorMessage.details);
            console.error(errorMessage);
          }
          else {
            console.error(res.message);
          }
        }
        return res;
      })
  },
  getRecommendCode({commit}, data) {
    return Payment.getRecommendCode(data)
      .then(res => {
        if (res.data.result) {
          commit(types.GET_RECOMMENDCODE, res.data );
        }
        else if (!res.data.result) {
          // False인 경우.
        }
        else {
          if (res.data.errorMessage) {
            const errorMessage = JSON.stringify(res.data.errorMessage.details);
            console.error(errorMessage);
          }
          else {
            console.error(res.message);
          }
        }
        return res;
      })
  }
}