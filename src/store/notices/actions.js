import Notices from '@/library/api/notices';
import types from './mutation-types';
export default {
  getNotices({ commit}) {
    return Notices.getNotices()
      .then(res => {
        commit(types.GET_NOTICES, res.data.data);
        return res;
      });
  }
};
