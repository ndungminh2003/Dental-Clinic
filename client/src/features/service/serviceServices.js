import Axios from "../../app/axiosConfig";

const getAllService = async (user) => {
  try{
    const response = await Axios.get(`service/get-all-service`);
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

const getServiceUseByRecordId = async (recordId) => {

  try{
    const response = await Axios.get("service-use/get-service-use",
    { params: { recordId } }
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
const deleteService = async (serviceId) => {
  const response = await Axios.delete(`service/delete-service/${serviceId}`);
  return response.data;
};
const updateService = async (service) => {
  const response = await Axios.put("service/update-service", service);
  return response.data;
};
const createService = async (service) => {
  const response = await Axios.post("service/create-service", service);
  return response.data;
};

const serviceService = {
    getAllService,
    getServiceUseByRecordId,
    deleteService,
    updateService,
    createService
};

export default serviceService;
