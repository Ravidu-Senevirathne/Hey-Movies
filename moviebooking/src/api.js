import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/auth'; // Base URL for the API

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/register`,
  UPDATE_USER: `${API_BASE_URL}/update`,
  GET_USER: `${API_BASE_URL}/user`, // Updated to reflect the endpoint correctly
  LOGOUT: `${API_BASE_URL}/logout`,
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(API_ENDPOINTS.LOGIN, credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_ENDPOINTS.REGISTER, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const updateUser = async (userData) => {
  try {
    const response = await axios.put(API_ENDPOINTS.UPDATE_USER, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (username) => {
  try {
 
    const response = await axios.get(`${API_BASE_URL}/user?username=${encodeURIComponent(username)}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};