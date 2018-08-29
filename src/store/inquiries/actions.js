import Inquiries from '@/library/api/inquiries';
import types from './mutation-types';

export default {
  getInquiries({ commit }) {
    return Inquiries.getInquiries()
      .then(res => {
        if (!_.isEmpty(res.data.result.data)) {
          // 데이터가 있다면
          commit(types.GET_INQUIRIES_SUCCESS, res.data.result.data);
        } else {
          // 데이터가 없다면
          commit(types.GET_INQUIRIES_FAILED);
        }
      });
  },
  getInquiriesDetail({commit}, data) {
    return Inquiries.getInquiriesDetail(data)
      .then(res => {
        commit(types.GET_INQUIRIES_DETAIL);
        console.log(res);
        return res;
      })
  }
};