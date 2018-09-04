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
  },
  postFindId({ commit } ,data) {
    return Auth.postFindId(data).then(res => {
      if (res.data.result) {
        commit(types.POST_FIND_ID, res.data.authId);
        return res;
      } else if (!res.data.result) {
        console.log('실패, 아이디가 없습니다.');
        return res;
      } else {
        console.log('통신 실패');
      }
    });
  },
  postFindIdAuth({ commit }, data) {
    return Auth.postFindAuth(data).then(res => {
      if (res.data.result) {
        commit(types.POST_FIND_ID_AUTH, res.data);
        return res;
      } else if (!res.data.result) {
        console.log('실패');
        return res;
      } else {
        console.log('통신실패');
      }
    })
  },
  postFindPwdAuth({ commit }, data) {
    return Auth.postFindAuth(data).then(res => {
      if (res.data.result) {
        commit(types.POST_FIND_PWD_AUTH, res.data);
        return res;
      } else if (!res.data.result) {
        console.log('실패');
        return res;
      } else {
        console.log('통신실패');
      }
    })
  },
  destroyFindIdAuth({commit}) {
    commit(types.DESTROY_FIND_ID_AUTH);
  },

  postFindPwd({ commit}, data) {
    return Auth.postFindPwd(data).then(res => {
      if (res.data.result) {
        commit(types.POST_FIND_PWD, res.data.authId);
        return res;
      } else if (!res.data.result) {
        return res;
      } else {
        console.log('통신 실패');
      }
    });
  },
  postPasswordComplete({ commit } , data) {
    return Auth.postPasswordComplete(data).then(res => {
      if (res.data.result) {
        commit(types.DESTROY_PASSWORD_AUTH);
        return res;
      }
    });
  },
};
