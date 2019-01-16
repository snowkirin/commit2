import Http from '@/library/HTTP';

export default {
  GetNotice() {
    const formData = {
      size: 9999,
      page: 1
    };
    return Http.get('/notices', {
      params: formData
    });
  }
};