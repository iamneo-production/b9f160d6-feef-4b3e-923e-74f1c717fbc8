import axios from "axios";

const BASE_URL = "https://8080-afdebfcecbccfeacffbbbdffeaeaadbdbabf.project.examly.io";
const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  config.headers["mode"] = "cors";
  config.headers["Access-Control-Allow-Origin"] = "*";
  config.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE";
  config.headers["Access-Control-Allow-Headers"] =
    "Origin, X-Requested-With, Content-Type, Accept";
  return config;
});

export default api;
export { BASE_URL };