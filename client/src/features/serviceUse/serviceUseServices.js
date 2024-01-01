import Axios from "../../app/axiosConfig";

const createServiceUse = async (serviceUse) => {
  console.log(serviceUse);
  const response = await Axios.post(
    "service-use/create-service-use",
    serviceUse
  );
  return response.data;
};

const getServiceUseByRecordId = async (recordId) => {
  try {
    const response = await Axios.get(`service-use/get-service-use/${recordId}`);
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

const serviceUseService = {
  createServiceUse,
  getServiceUseByRecordId,
};

export default serviceUseService;
