import axios from "axios";
import { getConfig } from "../../utils/getConfig";
import { API_URL } from "../../app/config";
const login = async (user) => {
  const response = await axios.post(`${API_URL}auth/login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const signUp = async (user) => {
  const response = await axios.post(`${API_URL}auth/sign-up`, user);

  return response.data;
};

const logout = async () => {
  let config = getConfig();
  const response = await axios.post(`${API_URL}auth/logout`, config);
  localStorage.removeItem("user");
  return response.data;
};

const blockUser = async (user) => {
  let config = getConfig();
  const response = await axios.put(`${API_URL}auth/block-user`, user, config);
  return response.data;
};

const authService = {
  login,
  signUp,
  logout,
  blockUser,
};

export default authService;
