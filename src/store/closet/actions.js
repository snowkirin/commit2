import types from './mutation-types';
import SubscriptionsAPI from '@/library/api/subscriptions';
import FaqAPI from '@/library/api/faq';
import NoticesAPI from '@/library/api/notices';

// 내일의 옷장 데이터 룰에 맞게 바꿔주는 함수
const processTomorrowData = function(param) {
  const _data = param.data;
  // 스토어에 저장할 데이터를 담는 함수.
  let payload = {};

  // data, id, status 값을 넣어준다.
  _.assign(
    payload,
    _.pick(_data, [
      'subscription_date',
      'subscription_id',
      'subscription_status'
    ])
  );
  payload.productA = [_data.products[0], _data.products[1]];
  payload.productB = [_data.products[2], _data.products[3]];

  return payload;
};

export default {
  /* [ 공통 ] */

  /* [ 내일의 옷장 ] */
  FETCH_TOMORROW_DATA(context) {
    SubscriptionsAPI.GetTomorrow()
      .then(({ data }) => {
        const resultData = processTomorrowData(data);
        if (resultData.productA[0].selected) {
          context.commit(types.SET_TOMORROW_SELECTED, 'TYPE A');
        }
        if (resultData.productB[0].selected) {
          context.commit(types.SET_TOMORROW_SELECTED, 'TYPE B');
        }
        // 내일의 옷장 데이터를 저장한다.
        context.commit(types.SET_TOMORROW_DATA, resultData);

        // 내일의 옷장 데이터가 존재한다.
        context.commit(types.SET_TOMORROW_DATA_EXIST, true);
      })
      .catch(() => {
        // 내일의 옷장 데이터가 없다.
        context.commit(types.SET_TOMORROW_DATA_EXIST, false);
      });
  },
  UPDATE_TOMORROW_SELECTED(context, param) {
    // param: boolean
    context.commit(types.SET_TOMORROW_SELECTED, param);
  },
  FETCH_TOMORROW_DIRECT_DATA(context, param) {
    SubscriptionsAPI.GetTomorrowDirect(param)
      .then(({ data }) => {
        if (data.result) {
          const payload = processTomorrowData(data);
          // common에 기본값들 넣기
          context.rootState.common.User.displayName = data.info.user_name;
          context.rootState.common.User.userId = data.info.member_id;

          context.commit(types.SET_TOMORROW_DIRECT_STATE, true);
          if (payload.productA[0].selected) {
            context.commit(types.SET_TOMORROW_SELECTED, 'TYPE A');
          }
          if (payload.productB[0].selected) {
            context.commit(types.SET_TOMORROW_SELECTED, 'TYPE B');
          }
          // 내일의 옷장 데이터를 저장한다.
          context.commit(types.SET_TOMORROW_DATA, payload);
          // 내일의 옷장 데이터가 존재한다.
          context.commit(types.SET_TOMORROW_DATA_EXIST, true);
        }
      })
      .catch(error => {
        context.commit(types.SET_TOMORROW_DATA_EXIST, false);
        throw new Error(error);
      });
  },
  UPDATE_TOMORROW_DIRECT_STATE(context, param) {
    // param: boolean
    context.commit(types.SET_TOMORROW_DIRECT_STATE, param);
  },
  /* [ 현재의 옷장 ] */
  FETCH_CURRENT_DATA(context) {
    // 현재의 옷장 데이터 호출
    SubscriptionsAPI.GetCurrent().then(({ data }) => {
      // 통신 성공
      if (data.result.length !== 0) {
        // 데이터 있을 경우
        const payload = {
          coupons: data.coupons,
          images: data.images,
          result: data.result[0]
        };
        context.commit(types.SET_CURRENT_DATA, payload);
        context.commit(types.SET_CURRENT_DATA_EXIST, true);
        SubscriptionsAPI.GetFeedbacks(payload.result.subscription_id)
          .then(({ data }) => {
            // 성공시
            context.commit(types.SET_CURRENT_FEEDBACK_STATE, true);
            context.commit(types.SET_CURRENT_FEEDBACK_DATA, data);
          })
          .catch(() => {
            // 실패시
            context.commit(types.SET_CURRENT_FEEDBACK_STATE, false);
            context.commit(types.SET_CURRENT_FEEDBACK_DATA, {});
          });
      } else {
        // 데이터 없을 경우
        context.commit(types.SET_CURRENT_DATA_EXIST, false);
      }
    });
  },
  // 현재의 옷장 직접 접근시 피드백 데이터 호출
  FETCH_CURRENT_FEEDBACK_DIRECT_DATA(context, param) {
    // 현재의 옷장 직접접근 체크
    SubscriptionsAPI.GetFeedbacksDirect(param)
      .then(async ({ data }) => {
        // 현재의 옷장 직접접근 호출 성공
        if (data.result) {
          // 결과값이 있다면 (올바른 토큰으로 접속했다면)
          // 값 넣어주기
          context.commit(types.SET_CURRENT_DATA_EXIST, true);
          context.commit(types.SET_CURRENT_FEEDBACK_DIRECT_STATE, true);
          context.rootState.login.User.displayName = data.info.user_name;
          SubscriptionsAPI.GetFeedbacks(data.info.subscription_id)
            .then(({ data }) => {
              context.commit(types.SET_CURRENT_FEEDBACK_STATE, true);
              context.commit(types.SET_CURRENT_FEEDBACK_DATA, data);
            })
            .catch(() => {
              context.commit(types.SET_CURRENT_FEEDBACK_STATE, false);
              context.commit(types.SET_CURRENT_FEEDBACK_DATA, {});
            });
        } else {
          context.commit(types.SET_DIRECT_ACCESS_FAILURE, {
            result: true,
            message: data.message
          });
        }
      })
      .catch(() => {
        context.commit(types.SET_CURRENT_DATA_EXIST, false);
        context.commit(types.SET_CURRENT_FEEDBACK_DIRECT_STATE, false);
      });
  },
  /* [과거의 옷장 ] */

  FETCH_PAST_DATA(context) {
    SubscriptionsAPI.GetPast().then(({ data }) => {
      if (data.result.length !== 0) {
        // 과거의 옷장 데이터가 있으면
        // 과거의 옷장 데이터 존재함
        context.commit(types.SET_PAST_DATA_EXIST, true);
        // 과거의 옷장 데이터 넣기
        context.commit(types.SET_PAST_DATA, data.result);

        // 과거의 옷장 피드백 가져오기
        let feedbackData = [];
        _.forEach(data.result, (value, idx) => {
          const formData = value.id;
          SubscriptionsAPI.GetFeedbacks(formData)
            .then(res => {
              let _data = res.data;
              _data.index = idx;
              feedbackData.push(_data);
            })
            .then(() => {
              feedbackData = _.chain(feedbackData)
                .sortBy('index')
                .value();
              context.commit(types.SET_PAST_FEEDBACK_DATA, feedbackData);
            });
        });
      } else {
        context.commit(types.SET_PAST_DATA_EXIST, false);
      }
    });
  },

  /* [ 구독정보 ] */
  FETCH_SUBSCRIPTION_DATA(context) {
    SubscriptionsAPI.GetSubscriptionInfo().then(({ data }) => {
      if (data.result) {
        context.commit(types.SET_SUBSCRIPTION_DATA, data);
      }
    });
  },

  /* [ FAQ ]*/
  FETCH_FAQ_DATA(context) {
    return new Promise((resolve, reject) => {
      FaqAPI.GetFaq()
        .then(({ data }) => {
          context.commit(types.SET_FAQ_DATA, data.result);
          resolve(data);
        })
        .catch(({ response }) => {
          reject(response);
        });
    });
  },
  FETCH_FAQ_TYPES(context) {
    FaqAPI.GetFaqTypes().then(({ data }) => {
      context.commit(types.SET_FAQ_TYPES, data.types);
    });
  },
  /* [ 공지사항 ] */
  FETCH_NOTICES_DATA(context) {
    NoticesAPI.GetNotice().then(({ data }) => {
      context.commit(types.SET_NOTICES_DATA, data.data);
    });
  }
};
