import Http from '@/library/HTTP';

export default {
  /*
   * 첫 배송 가능 요일 목록
   * */
  GetFirstDeliveryDays(data) {
    return Http.get(`/calendar/firstdeliverydays`, {
      params: {
        schymd: data
      }
    });
  },
  /*
   * 배송일 변경 가능 요일 목록
   * */
  GetChangeDeliveryDays(data) {
    return Http.get(`/calendar/changeDeliveryDays`, {
      withCredentials: true,
      params: {
        schymd: data
      }
    });
  }
};
