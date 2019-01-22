import types from './mutation-types';
import CodesAPI from '@/library/api/codes';
import Auth from '@/library/api/auth';

export default {
  FETCH_FAILED() {

  },
  FETCH_SIZES(context) {
    CodesAPI.GetSizes()
      .then(({ data }) => {
        context.commit(types.SET_SIZES, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  FETCH_OPTIONS(context) {
    CodesAPI.GetOptions()
      .then(({ data }) => {
        context.commit(types.SET_OPTIONS, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  LOGIN(context, payload) {
    return new Promise((resolve, reject) => {
      Auth.PostLogin(payload)
        .then(({ data }) => {
          if (data.result) {
            context.commit(types.LOGIN_SUCCESS, data);
          }
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  LOGOUT(context) {
    return new Promise(resolve => {
      Auth.PostLogout().then(({ data }) => {
        context.commit(types.LOGOUT_SUCCESS);
        resolve(data);
      });
    });
  },
  UPDATE_SUBSCRIPTION_STATUS(context, payload) {
    context.commit(types.SET_SUBSCRIPTION_STATUS, payload);
  },
};
