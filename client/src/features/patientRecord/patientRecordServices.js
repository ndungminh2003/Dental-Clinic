import axios from "axios";
import { getConfig } from "../../utils/getConfig";
import { API_URL } from "../../app/config";

const getAllPatientRecord = async (user) => {
    const config = getConfig();
    const response = await axios.get(
      `${API_URL}patient-record/get-all-patient-record`,
      config
    );
    return response.data;
  };
  
  const patientRecordService = {
    getAllPatientRecord,
  };
  
  export default patientRecordService;