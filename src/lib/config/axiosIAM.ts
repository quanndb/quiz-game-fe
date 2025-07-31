import axios from "axios";

const AxiosIAMInstance = axios.create({
  baseURL: process.env.IAM_URI,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
  },
});

AxiosIAMInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

AxiosIAMInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    throw error;
  }
);

export default AxiosIAMInstance;
