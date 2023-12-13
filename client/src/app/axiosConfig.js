import axios from "axios";

let httpClient = axios.create({
  baseURL: "http://localhost:5000/api/",
});

httpClient.interceptors.request.use(function (config) {
  const token = JSON.parse(localStorage.getItem("user"))?.accessToken || "";
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default httpClient;
