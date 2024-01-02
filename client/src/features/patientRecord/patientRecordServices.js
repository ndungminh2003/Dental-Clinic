import Axios from "../../app/axiosConfig";

const getAllPatientRecord = async (user) => {
  try {
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

const getOnePatientRecord = async (recordId) => {
  try {
    const response = await Axios.get(
      `patient-record/get-patient-record/${recordId}`
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

const getPatientRecordDentistId = async (dentistId) => {
  try {
    const response = await Axios.get(
      `patient-record/get-patient-record-by-dentist-id/${dentistId}`
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

const getPatientRecordByCustomerId = async (customerId) => {
  try {
    const response = await Axios.get(
      `patient-record/get-patient-record-by-customer-id/${customerId}`
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

const createPatientRecord = async (patientRecord) => {
  const response = await Axios.post(
    "patient-record/create-patient-record",
    patientRecord
  );
  return response.data;
};

const patientRecordService = {
  getAllPatientRecord,
  createPatientRecord,
  getPatientRecordDentistId,
  getOnePatientRecord,
  getPatientRecordByCustomerId,
};

export default patientRecordService;
