import Http from '@/library/HTTP';

export default {
  GetFaq(data) {
    return Http.get('/faq', {
      params: data
    });
  },
  GetMainFaq(data) {
    return Http.get('/faq/mains', {
      params: data
    });
  },
  GetFaqTypes(data) {
    return Http.get('/faq/types', {
      params: data
    });
  },
};
