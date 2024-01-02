import Axios from "../../app/axiosConfig";

const createStaffAccount = async (staff) => {
  try {
    const response = await Axios.post("staff/create-staff-account", staff);
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

const getAllStaff = async () => {
  try {
    const response = await Axios.get("staff/get-all-staff");
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

const getOneStaff = async (staffId) => {
  try {
    const response = await Axios.get(`staff/get-one-staff/${staffId}`);
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

const updateStaffProfile = async (staff) => {
  try {
    const response = await Axios.put("staff/change-staff-profile", staff);
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

const changeStaffPassword = async (staff) => {
  try {
    const response = await Axios.put("staff/change-staff-password", staff);
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

const staffService = {
  createStaffAccount,
  getAllStaff,
  getOneStaff,
  updateStaffProfile,
  changeStaffPassword,
};

export default staffService;
