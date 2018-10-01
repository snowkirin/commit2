import Codes from '@/library/api/codes';
import types from './mutation-types';

export default {
  getSizes({ commit }) {
    return Codes.getSizes().then(res => {
      if (res.data.result || res.status === 200) {
        /*
        * 사이즈 데이터 가공
        * 2018-08-16
        * 블라우스/셔츠, 치마에서 44, 44반 이런 부분을 이름(name)순으로 정렬
        * */
        let resultData = {};
        _.forEach(res.data, (value, key) => {
          if (key === 'blouse' || key === 'skirt') {
            let orderData = _.orderBy(value, ['name'], ['asc']);
            if (key === 'blouse') {
              _.assign(resultData, {
                blouse: orderData
              });
            } else if (key === 'skirt') {
              _.assign(resultData, {
                skirt: orderData
              });
            }
          } else {
            if (key === 'pants') {
              _.assign(resultData, {
                pants: value
              });
            } else if (key === 'body_type') {
              _.assign(resultData, {
                body_type: value
              });
            }
          }
        });
        //  사이즈 데이터 가공 끝

        commit(types.GET_SIZES, resultData);
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
  getFirstDeliveryDays({ commit }, data) {
    return Codes.getFirstDeliveryDays(data).then(res => {
      if (res.data.result || res.status === 200) {
        commit(types.GET_FIRST_DELIVERY_DAYS, res.data);
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
  getChangeDeliveryDays({ commit }, data) {
    return Codes.getChangeDeliveryDays(data).then(res => {
      if (res.data.result) {
        commit(types.GET_CHANGE_DELIVERY_DAYS, res.data.list);
        return res;
      } else {
        return res;
      }
    });
  },
  getOptions({ commit }) {
    return Codes.getOptions().then(res => {
      if (res.data.result || res.status === 200) {
        commit(types.GET_OPTIONS, res.data);
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
  }
};
