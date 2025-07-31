import axios from 'axios';

const API_BASE = 'http://localhost:8000'; // your FastAPI server

export async function registerUser(data) {
  return axios.post(`${API_BASE}/register`, data);
}
