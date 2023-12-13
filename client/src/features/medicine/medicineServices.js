import Axios from "../../app/axiosConfig";

const getAllMedicine = async () => {
  try {
    const response = await Axios.get("medicine/get-all-medicine");
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

const getOneMedicine = async (medicineId) => {
  try {
    const response = await Axios.get("medicine/get-one-medicine", {
      medicineId,
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

const createMedicine = async (medicine) => {
  try {
    const response = await Axios.post("medicine/create-medicine", medicine);
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

const updateMedicine = async (medicine) => {
  try {
    const response = await Axios.put("medicine/update-medicine", medicine);
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

const deleteMedicine = async (medicineId) => {
  try {
    const response = await Axios.delete("medicine/delete-medicine", {
      medicineId,
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

const customerService = {
  createMedicine,
  getAllMedicine,
  getOneMedicine,
  deleteMedicine,
  updateMedicine,
};

export default customerService;
