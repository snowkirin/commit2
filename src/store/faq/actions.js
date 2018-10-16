import Faq from '@/library/api/faq';
import types from './mutation-types';

export default {
  getFaq({ commit }, data) {
    return Faq.getFaq(data).then(res => {
      if (!_.isEmpty(res.data.result)) {
        commit(types.GET_FAQ, res.data.result);
        return res;
      } else {
        console.log('GET FAQ Error')
      }
    });
  },
  getFaqMain({ commit }, data) {
    return Faq.getFaqMain(data).then(res => {
      if (res.data.list.length !== 0) {
        commit(types.GET_FAQ_MAIN_LIST, res.data.list);
        return res;
      } else {
        console.log('GET FAQ MAIN Error ');
      }
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
