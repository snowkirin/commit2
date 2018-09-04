import Faq from '@/library/api/faq';
import types from './mutation-types';

export default {
  getFaq() {
    return Faq.getFaq().then(() => {});
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
  }
};
