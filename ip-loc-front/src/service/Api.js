import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const postIp = async (ip) => {
  const obj = {
    'nom': 'Mon IP',
    'query': ip,
  };
  const response = await axios.post(`${BASE_URL}/ip`, obj);
  return response.data;
}

const getAllIp = async () => {
  const response = await axios.get(`${BASE_URL}/ip`);
  return response.data;
}

export default {
  postIp,
  getAllIp,
};