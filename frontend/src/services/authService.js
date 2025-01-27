import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/auth';

export const registerExaminer = async (data) => {
  return axios.post(`${API_URL}/register/examiner`, data);
};

export const loginExaminer = async (data) => {
  const response = await axios.post(`${API_URL}/login/examiner`, data);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', 'examiner');
    localStorage.setItem('examinerId', response.data.id);
  }
  return response.data;
};

export const registerCandidate = async (data, token) => {
  return axios.post(`http://localhost:8080/api/examiner/register/candidate`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const loginCandidate = async (data) => {
  const response = await axios.post(`${API_URL}/login/candidate`, data);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', 'candidate');
    localStorage.setItem('candidateId', response.data.id);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('examinerId');
  localStorage.removeItem('candidateId');
};

export const getToken = () => localStorage.getItem('token');
export const getRole = () => localStorage.getItem('role');
export const getExaminerId = () => localStorage.getItem('examinerId');
export const getCandidateId = () => localStorage.getItem('candidateId');
