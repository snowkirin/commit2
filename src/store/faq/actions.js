import Faq from '@/library/api/faq';
import types from './mutation-types';

export default {
  getFaq({ commit }, data) {
    return Faq.getFaq(data).then(res => {
      if (!_.isEmpty(res.data.result)) {
        commit(types.GET_FAQ, res.data.result);
        return res;
      } else {
        console.log('GET FAQ Error');
      }
    });
  },
  QUERY_FAQ_MAINS(context, payload) {
    return new Promise((resolve, reject) => {
      Faq.QueryMainFaq(payload)
        .then(({ data }) => {
          context.commit(types.SET_FAQ_MAIN_LIST, data.list);
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getFaqTypes({ commit }, data) {
    return Faq.getFaqTypes(data).then(res => {
      if (res.data.types.length !== 0) {
        commit(types.GET_FAQ_TYPES, res.data.types);
        return res;
      } else {
        console.log('GET FAQ Types Error');
      }
    });
  }
};
