import Auth from '@/library/api/auth';
import Closet from '@/library/api/closet';
import types from './mutation-types';

const changeEmail = async ({ commit }, data) => {
  try {
    const result = await Closet.setChangeEmail({
      changeEmail: data,
    });

    if (result.data.duplicate) {
      alert('이미 등록된 이메일입니다. 이메일 주소를 다시 확인해주세요.');
      return;
    }

    if (result.data.result) {
      commit(types.MYPAGE_CHANGE_EMAIL, true);
    } else alert('서비스에 문제가 발생하였습니다.\n새로고침 후 다시 시도해주세요');
  } catch (e) {
    console.error(e.message);
  }
};

const changeFlag = async ({ commit }, type) => {
  if (type === 'email') commit(types.MYPAGE_CHANGE_EMAIL, false);
  else if (type === 'pwd') commit(types.MYPAGE_CHANGE_PASSWORD, false);
};

const changePwd = async ({ commit }, data) => {
  try {
    const result = await Closet.setChangePwd({
      ...data,
    });

    if (result.data.uncorrect) {
      alert('현재 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (result.data.result) commit(types.MYPAGE_CHANGE_PASSWORD, true);
    else alert('서비스에 문제가 발생하였습니다.\n새로고침 후 다시 시도해주세요');
  } catch (e) {
    console.error(e.message);
  }
};

const setMypage = async ({ commit }) => {
  try {
    const result = await Closet.mypageInfo();

    if (result.data.result) {
      commit(types.MYPAGE_LOAD, {
        type: 'mypage',
        data: result.data.data,
      });
    } else alert('서비스에 문제가 발생하였습니다.\n새로고침 후 다시 시도해주세요');
  } catch (e) {
    console.error(e.message);
  }
};

const setMypageStyle = async ({ commit }) => {
  try {
    const result = await Closet.mypageStyle();

    if (result.data.result) {
      commit(types.MYPAGE_LOAD, {
        type: 'mypageStyle',
        data: result.data.data,
      });
    } else alert('서비스에 문제가 발생하였습니다.\n새로고침 후 다시 시도해주세요');
  } catch (e) {
    console.error(e.message);
  }
};

const setMypageCache = async ({ commit }, data) => {
  commit(types.MYPAGE_LOAD, {
    type: 'mypageStyle',
    data,
  });
};

const mypageSecurity = async ({ commit }, data) => {
  try {
    const result = await Auth.mypagePwdCheck({
      ...data,
    });

    if (result.data.result) commit(types.MYPAGE_SECURITY, result.data);
    else alert('비밀번호를 다시 확인해주세요.');
  } catch (e) {
    console.error(e.message);
  }
};

const phoneVerify = async ({ commit }, data) => {
  try {
    commit(types.PHONE_VERIFY_COUNT);

    const result = await Closet.authPhone({
      ...data,
    });

    if (result.data.result) commit(types.PHONE_VERIFY, result.data);
  } catch (e) {
    console.error(e.message);
  }
};

const phoneCheckVerify = async ({ state, commit }, data) => {
  try {
    const result = await Closet.authPhoneCheck({
      authId: state.phoneAuthKey,
      ...data,
    });

    if (result.data.result) commit(types.PHONE_VERIFY_CHECK);
  } catch (e) {
    console.error(e.message);
  }
};

const securityDestroyed = ({ commit }) => {
  commit(types.MYPAGE_SECURITY_DESTROYED);
};

export default {
  changePwd,
  changeEmail,
  changeFlag,
  mypageSecurity,
  securityDestroyed,
  setMypage,
  setMypageStyle,
  setMypageCache,
  phoneVerify,
  phoneCheckVerify,
};
