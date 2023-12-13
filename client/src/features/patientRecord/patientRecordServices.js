import Axios from "../../app/axiosConfig";

const getAllPatientRecord = async (user) => {
  try{
    const response = await Axios.get(`patient-record/get-all-patient-record`);
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

const patientRecordService = {
  getAllPatientRecord,
};

export default patientRecordService;
