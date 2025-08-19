import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000'; // your Flask server URL

// ✅ Fetch saved messages from backend
export const fetchMessages = () => {
  return axios.get(`${BASE_URL}/messages`);
};

// ✅ Save messages to backend
export const saveMessages = (messages) => {
  return axios.post(`${BASE_URL}/save-messages`, { messages });
};

// ✅ Send message to AI backend
export const sendMessageToAI = (message) => {
  return axios.post(`${BASE_URL}/chat`, { message });
};
