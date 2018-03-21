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
    const result = await Auth.finalAuthFindId({
      authId: state.phoneAuthKey,
      ...data,
    });

    commit(types.PHONE_VERIFY_CHECK, result.data);
  } catch (e) {
    console.error(e.message);
  }
};

export default {
  phoneVerify,
  phoneCheckVerify,
};
