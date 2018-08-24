import axios from "axios";
const API_URL = process.env.VUE_APP_API_URL;

export default {
  getInquiries() {
    return axios
      .get(`${API_URL}/inquiries`, {
        withCredentials: true
      })
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  },
  postInquiries(data) {
    return axios
      .post(`${API_URL}/inquiries`, data, {
        withCredentials: true
      })
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  },
  getInquiriesDetail(id) {
    return axios
      .get(`${API_URL}/inquiries/${id}`, {
        withCredentials: true
      })
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  },
  putInquiriesDetail(id, content) {
    return axios
      .put(`${API_URL}/inquiries/${id}`, content, {
        withCredentials: true
      })
      .then(res => {
        return res;
      })
      .catch(err => {
        return {
          ...err.response,
          message: err.message
        };
      });
  }
};

// function getInquiries() {
//   const result = axios.get(`${API_URL}/inquiries`)
//     .then((res) => {
//       return res;
//     }).catch((err) => {
//       return {
//         ...err.response,
//         message: err.message
//       };
//     })
//   return result;
// };
//
// const inquiriesList = () => axios.get(`${API_URL}/inquiries/`, {
//   withCredentials: true,
// }).then(result => result).catch(err => err.response);
//
// const inquiriesInfo = ({
//   inquiriesId,
// }) => axios.get(`${API_URL}/inquiries/${inquiriesId}`, {
//   withCredentials: true,
// }).then(result => result).catch(err => err.response);
//
// const setNewInquiries = ({
//   subject,
//   email,
//   email_noti: emailNoti,
//   cell_phone: cellPhone,
//   cell_phone_noti: cellPhoneNoti,
//   inquiryType,
//   content,
// }) => axios.post(`${API_URL}/inquiries`, {
//   subject,
//   email,
//   email_noti: emailNoti,
//   cell_phone: cellPhone,
//   cell_phone_noti: cellPhoneNoti,
//   inquiry_type: inquiryType,
//   content,
// }, {
//   withCredentials: true,
// }).then(result => result).catch(err => err.response);
//
// const setPutInquiries = ({
//   inquiriesId,
//   content,
// }) => axios.put(`${API_URL}/inquiries/${inquiriesId}`, {
//   content,
// }, {
//   withCredentials: true,
// }).then(result => result).catch(err => err.response);
//
// export default {
//   inquiriesList,
//   inquiriesInfo,
//   setNewInquiries,
//   setPutInquiries,
// };
