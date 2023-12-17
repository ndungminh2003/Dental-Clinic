import Axios from "../../app/axiosConfig";

const createDentistAccount = async (dentist) => {
  try {
    const response = await Axios.post(
      "dentist/create-dentist-account",
      dentist
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

const getAllDentist = async () => {
  try {
    const response = await Axios.get("dentist/get-all-dentist");
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

const getOneDentist = async (dentistId) => {
  try {
    const response = await Axios.get("dentist/get-one-dentist", {
      dentistId,
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

const updateDentistProfile = async (dentist) => {
  try {
    const response = await Axios.put("dentist/change-dentist-profile", dentist);
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

const changeDentistPassword = async (dentist) => {
  try {
    const response = await Axios.put(
      "dentist/change-dentist-password",
      dentist
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

const dentistService = {
  createDentistAccount,
  getAllDentist,
  getOneDentist,
  changeDentistPassword,
  updateDentistProfile,
};

export default dentistService;
