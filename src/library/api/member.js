import axios from 'axios';

const API_URL = process.env.API_URL;

async function getMemberCount() {
  try {
    const result = axios.get(`${API_URL}/member/count`)
      .then(function(res) {
        return res;
      })
      .catch(function(error) {
        return error;
      });
    return result;
  } catch (err) {
    console.error(err, 'member/count');
  }
}

export default {
  getMemberCount,
};
