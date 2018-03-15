import Auth from '@/library/api/auth';
import types from './mutation-types';

const setFirstData = ({ commit }, data) => {
  commit(types.SET_SIGNUP_FIRST_DATA, data);
};

const phoneVerify = async ({ commit }, data) => {
  try {
    commit(types.PHONE_VERIFY_COUNT);

    const result = await Auth.authPhone({
      ...data,
    });

    if (result.data.result) commit(types.PHONE_VERIFY, result.data);
  } catch (e) {
    console.error(e.message);
  }
};

const phoneCheckVerify = async ({ state, commit }, data) => {
  try {
    const result = await Auth.authPhoneCheck({
      authId: state.phoneAuthKey,
      ...data,
    });

    if (result.data.result) commit(types.PHONE_VERIFY_CHECK);
  } catch (e) {
    console.error(e.message);
  }
};

export default {
  setFirstData,
  phoneVerify,
  phoneCheckVerify,
};
