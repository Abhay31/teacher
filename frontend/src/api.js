import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = (username, password) => {
  return axios.post(`${API_URL}/register`, { username, password });
};

export const login = (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

export const getCurrentUser = (token) => {
  return axios.get(`${API_URL}/me`, {
    headers: { 'x-access-token': token }
  });
};