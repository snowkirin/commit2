import Auth from '@/library/api/auth';
import Closet from '@/library/api/closet';
import types from './mutation-types';

const changeEmail = async ({ commit }) => {
  try {
    const result = await Closet.setChangeEmail();

    console.log(result.data.duplicate);

    if (result.data.result) {
      commit(types.MYPAGE_CHANGE_EMAIL, result.data.data);
    } else alert('서비스에 문제가 발생하였습니다.\n새로고침 후 다시 시도해주세요');
  } catch (e) {
    console.error(e.message);
  }
};

const setMypage = async ({ commit }) => {
  try {
    const result = await Closet.mypageInfo();

    if (result.data.result) commit(types.MYPAGE_LOAD, result.data.data);
    else alert('서비스에 문제가 발생하였습니다.\n새로고침 후 다시 시도해주세요');
  } catch (e) {
    console.error(e.message);
  }
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

const securityDestroyed = ({ commit }) => {
  commit(types.MYPAGE_SECURITY_DESTROYED);
};

export default {
  changeEmail,
  mypageSecurity,
  securityDestroyed,
  setMypage,
};
