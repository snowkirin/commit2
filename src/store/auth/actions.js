import Auth from '@/library/api/auth';
import types from './mutation-types';

export default {
  postPassword({ commit }, data) {
    return Auth.postPassword(data).then(res => {
      if (res.data.result) {
        commit(types.POST_PASSWORD);
      }
      return res;
    });
  },
  destroyPasswordAuth({ commit }) {
    commit(types.DESTROY_PASSWORD_AUTH);
  }
};
