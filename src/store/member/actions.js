import Member from '@/library/api/member';
import types from './mutation-types';

export default {
  setMemberCount({ commit }) {
    return Member.getMemberCount().then(res => {
      if (res.data.result) {
        commit(types.MEMBER_COUNT, res.data.count);
        return res;
      } else {
        if (res.data.errorMessage) {
          const errorMessage = JSON.stringify(res.data.errorMessage.details);
          console.error(errorMessage);
        } else {
          console.error(res.message);
        }
        return res;
      }
    });
  },
  getMemberStyleType({ commit }) {
    return Member.getMemberStyleType().then(res => {
      if (res.data.result || res.status === 200) {
        commit(types.MEMBER_STYLE_TYPE, res.data.questions);
      } else {
        if (res.data.errorMessage) {
          const errorMessage = JSON.stringify(res.data.errorMessage.details);
          console.error(errorMessage);
        } else {
          console.error(res.message);
        }
      }
      return res;
    });
  },
  getMemberStyle({ commit }) {
    return Member.getMemberStyle().then(res => {
      if (res.data.result) {
        // result === true라면
        commit(types.MEMBER_STYLE, res.data.data);
      } else if (!res.data.result) {
        // result === false
      } else {
        // Unknow Error
        if (res.data.errorMessage) {
          const errorMessage = JSON.stringify(res.data.errorMessage.details);
          console.error(errorMessage);
        } else {
          console.error(res.message);
        }
      }
      return res;
    });
  },
  getMypage({ commit }) {
    return Member.getMypage().then(res => {
      if (res.data.result) {
        commit(types.GET_MYPAGE, res.data.data);
      }
      return res;
    });
  },
  postPhone({ commit }, data) {
    return Member.postPhone(data).then(res => {
      if (res.data.result) {
        commit(types.POST_PHONE, res.data.authId);
      } else {
        console.log('Post Phone Error');
      }
      return res;
    });
  },
  patchPhone({ commit }, data) {
    return Member.patchPhone(data).then(res => {
      if (res.data.result) {
        commit(types.PATCH_PHONE);
      } else {
        console.log('Patch Phone Error');
      }
      return res;
    });
  },
  patchPayment({ commit }, data) {
    return Member.patchPayment(data).then(res => {
      if (res.data.result) {
        commit(types.PATCH_PAYMENT);
        return res;
      } else {
        console.log('Patch Payment Error');
      }
    });
  },
  patchAddress({ commit }, data) {
    return Member.patchAddress(data).then(res => {
      if (res.data.result) {
        commit(types.PATCH_ADDRESS);
        return res;
      } else {
        console.log('Patch Address Error');
      }
    });
  },
  patchLobbyPassword({ commit}, data) {
    return Member.patchLobbyPassword(data).then(res => {
      if (res.data.result) {
        commit(types.PATCH_LOBBY_PASSWORD);
        return res;
      } else {
        console.log('Patch Lobby Password Error');
      }
    })
  },
  patchAnn({ commit }, data) {
    return Member.patchAnn(data).then(res => {
      if (res.data.result) {
        commit(types.PATCH_ANN);
        return res;
      } else {
        console.log('Patch Ann Error');
      }
    })
  }
};
