import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const shortenUrl = async (longUrl, customAlias, topic, token) => {
  const response = await axios.post(
    `${API_BASE_URL}/url/shorten`,
    { longUrl, customAlias, topic },
    { headers: { Authorization: token } }
  );
  return response.data;
};

export const getAnalytics = async (alias, token) => {
  const response = await axios.get(`${API_BASE_URL}/analytics/${alias}`, {
    headers: { Authorization: token },
  });
  return response.data;
};

export const getTopicAnalytics = async (topic, token) => {
  const response = await axios.get(`${API_BASE_URL}/analytics/topic/${topic}`, {
    headers: { Authorization: token },
  });
  return response.data;
};

export const getOverallAnalytics = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/analytics/over/overall`, {
    headers: { Authorization: token },
  });
  return response.data;
};

export const loginWithGoogle = async (token) => {
  const response = await axios.post(`${API_BASE_URL}/auth/google`, { token });
  return response.data;
};