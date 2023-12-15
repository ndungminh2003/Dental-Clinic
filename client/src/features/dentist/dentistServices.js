import Axios from "../../app/axiosConfig";
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
const dentistService = {
  getAllDentist,
};

export default dentistService;
