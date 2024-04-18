import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const postIp = async (ipObj) => {
  const response = await axios.post(`${BASE_URL}/ip`, ipObj);
  return response.data;
}

const searchIp = async (ip) => {
  const response = await axios.get(`${BASE_URL}/ip/search/${ip}`);
  return response.data;
}

const getIps = async () => {
  const response = await axios.get(`${BASE_URL}/ip`);
  return response.data;
}

const getIpByName = async (name) => {
  const response = await axios.get(`${BASE_URL}/ip/${name}`);
  return response.data;
}

const deleteIp = async (name) => {
  const response = await axios.delete(`${BASE_URL}/ip/${name}`);
  return response.data;
}

const importCSV = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${BASE_URL}/ip/importCSV`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
}

export default {
  postIp,
  searchIp,
  getIps,
  getIpByName,
  deleteIp,
  importCSV
};