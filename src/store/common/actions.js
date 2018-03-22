import Auth from '@/library/api/auth';
import types from './mutation-types';

const phoneVerify = async ({ commit }, data) => {
  try {
    commit(types.PHONE_VERIFY_COUNT);

    const result = await Auth.authFindId({
      ...data,
    });

    await commit(types.PHONE_VERIFY, result.data);
  } catch (e) {
    console.error(e.message);
  }
};

const phoneCheckVerify = async ({ state, commit }, data) => {
  try {
    const result = await Auth.finalAuth({
      authId: state.phoneAuthKey,
      ...data,
    });

    commit(types.PHONE_VERIFY_CHECK, result.data);
  } catch (e) {
    console.error(e.message);
  }
};

const phonePasswordVerify = async ({ commit }, data) => {
  try {
    commit(types.PHONE_VERIFY_COUNT_PWD);

    const result = await Auth.authFindPwd({
      ...data,
    });

    await commit(types.PHONE_VERIFY_PWD, result.data);
  } catch (e) {
    console.error(e.message);
  }
};

const phonePasswordCheckVerify = async ({ state, commit }, data) => {
  try {
    const result = await Auth.finalAuth({
      authId: state.phonePwdAuthKey,
      ...data,
    });

    commit(types.PHONE_VERIFY_CHECK_PWD, result.data);
  } catch (e) {
    console.error(e.message);
  }
};

const changePassword = async ({ commit, state }, data) => {
  try {
    const result = await Auth.findPwdComplete({
      authId: state.phonePwdAuthKey,
      ...data,
    });

    if (result.data.result) commit(types.PHONE_VERIFY_PWD_COMPLETE);
    else alert('비밀번호 변경에 실패하였습니다.\n관리자에게 문의해주세요.');
  } catch (e) {
    console.error(e.message);
  }
};

export default {
  phoneVerify,
  phonePasswordVerify,
  phoneCheckVerify,
  phonePasswordCheckVerify,
  changePassword,
};
