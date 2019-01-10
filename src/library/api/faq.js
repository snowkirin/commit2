import Http from '@/library/HTTP';

export default {
  GetMainFaq(data) {
    return Http.query('/faq/mains', {
      params: data
    });
  }
};
