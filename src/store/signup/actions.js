import Auth from "@/library/api/auth";
import Management from "@/library/api/management";
import types from "./mutation-types";

export default {
  setSizes({ commit }, data) {
    commit(types.SET_SIZES, data);
  },
  // setJoinFirst({commit}, data) {
  //   commit(types.SET_JOIN_FIRST, data);
  // },
  // setJoinSecond({commit}, data) {
  //   commit(types.SET_JOIN_SECOND, data);
  // },
  async setManagement({ commit }, data) {
    try {
      const result = await Management.getManagementCodes({
        code: data.code
      });

      if (result.data.result) {
        commit(types.SET_MANAGEMENT, {
          type: data.type,
          data: result.data.data
        });
      } else
        alert("서비스에 문제가 발생하였습니다.\n새로고침 후 다시 시도해주세요");
    } catch (e) {
      console.error(e.message);
    }
  },
  setRequirement({ commit }, data) {
    const rtn = data === "요구사항을 적어주세요." ? "" : data;
    commit(types.SET_REQUIREMENT, rtn);
  },
  postPhone({ commit }, data) {
    return Auth.postPhone(data).then(res => {
      if (res.data.result || res.status === 200) {
        if (!res.data.phoneDulicated && !res.data.emailDuplicated) {
          commit(types.POST_PHONE, res.data);
        }
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
  patchPhone({ commit }, data) {
    return Auth.patchPhone(data).then(res => {
      if (res.data.result || res.status === 200) {
        if (res.data.result === 1) {
          commit(types.PATCH_PHONE);
        }
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
  setJoin({ commit, state }, data) {
    commit(types.SET_JOIN, data);
  },
  postJoin({ commit, state }) {
    return Auth.postJoin(state.Join).then(res => {
      if (res.data.result || res.status === 200) {
        console.log(res);
        commit(types.POST_JOIN);
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
  }
};
