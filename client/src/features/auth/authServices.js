import Axios from "../../app/axiosConfig";

const login = async (user) => {
  const response = await Axios.post("auth/login", user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const signUp = async (user) => {
  const response = await Axios.post("auth/sign-up", user);
  return response.data;
};

const logout = async () => {
  const response = await Axios.post("auth/logout");
  localStorage.removeItem("user");
  return response.data;
};

const updateCustomerProfile = async (customer) => {
  const response = await Axios.put(
    `customer/update-customer-profile/${customer.id}`,
    customer
  );
  return response.data;
};

const blockUser = async (user) => {
  try {
    const response = await Axios.put("auth/block-user", user);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }
};

const authService = {
  login,
  signUp,
  logout,
  blockUser,
  updateCustomerProfile,
};

export default authService;
