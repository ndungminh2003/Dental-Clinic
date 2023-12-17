import Axios from "../../app/axiosConfig";

const getAllCustomer = async () => {
  try {
    const response = await Axios.get("customer/get-all-customer");
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

const getOneCustomer = async (customerId) => {
  try {
    const response = await Axios.get("customer/get-one-customer", {
      customerId,
    });
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

const updateCustomerProfile = async (customer) => {
  try {
    const response = await Axios.put(
      "customer/update-customer-profile",
      customer
    );
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

const changeCustomerPassword = async (customer) => {
  try {
    const response = await Axios.put(
      "customer/change-customer-password",
      customer
    );
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

const customerService = {
  getAllCustomer,
  getOneCustomer,
  changeCustomerPassword,
  updateCustomerProfile,
};

export default customerService;
