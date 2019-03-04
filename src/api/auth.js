import Http from '@/plugin/HTTP';

export default {
  /*
  * 사이즈 목록 가져오기
  * */
  GetProduct(param) {
    return Http.get(`/auth/product`, param);
  }
};
