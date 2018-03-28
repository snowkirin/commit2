import axios from 'axios';

const API_URL = process.env.API_URL;

const inquiriesList = () => axios.get(`${API_URL}/inquiries/`, {
  withCredentials: true,
}).then(result => result).catch(err => err.response);

const inquiriesInfo = ({
  inquiriesId,
}) => axios.get(`${API_URL}/inquiries/${inquiriesId}`, {
  withCredentials: true,
}).then(result => result).catch(err => err.response);

const setNewInquiries = ({
  subject,
  email,
  emailNoti,
  cellPhone,
  cellPhoneNoti,
  inquiryType,
  content,
}) => axios.post(`${API_URL}/inquiries`, {
  subject,
  email,
  email_noti: emailNoti,
  cell_phone: cellPhone,
  cell_phone_noti: cellPhoneNoti,
  inquiry_type: inquiryType,
  content,
}, {
  withCredentials: true,
}).then(result => result).catch(err => err.response);

const setPutInquiries = ({
  inquiriesId,
  content,
}) => axios.put(`${API_URL}/inquiries/${inquiriesId}`, {
  content,
}, {
  withCredentials: true,
}).then(result => result).catch(err => err.response);

export default {
  inquiriesList,
  inquiriesInfo,
  setNewInquiries,
  setPutInquiries,
};
