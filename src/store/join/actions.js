import types from './mutation-types';
import AuthAPI from '@/library/api/auth';

export default {
  ADD_SIZES_DATA(context, payload) {
    context.commit(types.SET_SIZES_DATA, payload);
  },
  ADD_PREFERRED_STYLE_DATA(context, payload) {
    context.commit(types.SET_PREFERRED_STYLE_DATA, payload);
  },
  ADD_USER_INFO_DATA(context, payload) {
    context.commit(types.SET_USER_INFO_DATA, payload);
  },
  ADD_PAYMENT_INFO_DATA(context, payload) {
    context.commit(types.SET_PAYMENT_INFO_DATA, payload);
  },
  async SIGNIN(context) {
    const state = context.state;
    if (_.isEmpty(state.SizesForMembership)) {
      // Size Empty
      return {
        results: false,
        errorMsg: '사이즈 정보가 없습니다.'
      };
    } else if (_.isEmpty(state.PreferredStyleForMembership)) {
      // Preferred Style Empty
      return {
        results: false,
        errorMsg: '선호 스타일 정보가 없습니다.'
      };
    } else if (_.isEmpty(state.UserInfoForMembership)) {
      // User Info Empty
      return {
        results: false,
        errorMsg: '회원 정보 및 약관 동의 정보가 없습니다.'
      };
    } else if (_.isEmpty(state.PaymentForMembership)) {
      // Payment Info Empty
      return {
        results: false,
        errorMsg: '배송 및 결제 정보가 없습니다.'
      };
    } else {
      // Not Empty. Success.
      const totalSignInData = {
        ...state.SizesForMembership,
        ...state.PreferredStyleForMembership,
        ...state.UserInfoForMembership,
        ...state.PaymentForMembership
      };
      console.log(totalSignInData);
      const resultData = await AuthAPI.PostJoin(totalSignInData);
      console.log(resultData);
      if (!resultData.data.result) {
        if (resultData.data.paymentRtn) {
          // 카드정보는 정확히 입력하였으나 다른 이유로 오류가 난 경우
          return {
            results: false,
            errorMsg: '오류가 발생 되었습니다. 잠시 후 다시 시도해 주세요.'
          };
        } else {
          // 카드정보가 정확히 입력되지 않은 경우
          return {
            results: false,
            errorMsg: '카드 정보를 확인해주세요.'
          };
        }
      } else {
        // 성공!
        return {
          results: true
        };
      }
    }
  },
  ADD_MEMBERSHIP_DATA(context, payload) {
    context.commit(types.SET_MEMBERSHIP_DATA, payload);
  }
};