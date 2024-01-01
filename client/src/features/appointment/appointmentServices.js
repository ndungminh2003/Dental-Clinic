import Axios from "../../app/axiosConfig";
const getAllAppointment = async () => {
  try {
    const response = await Axios.get("appointment/get-all-appointment");
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

const getOneAppointment = async (id) => {
  try {
    const response = await Axios.get("appointment/get-one-appointment", { id });
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

const getCustomerAppointment = async (customerId) => {
  try {
    const response = await Axios.get(
      `appointment/get-customer-appointment/${customerId}`
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

const getDentistAppointment = async (dentistId) => {
  try {
    const response = await Axios.get(
      `appointment/get-dentist-appointment/${dentistId}`
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

const updateAppointmentStatus = async (appointment) => {
  const response = await Axios.put(
    "appointment/update-appointment-status",
    appointment
  );
  return response.data;
};

const makeAppointment = async (appointment) => {
  const response = await Axios.post(
    "appointment/make-appointment",
    appointment
  );
  return response.data;
};

const cancelAppointment = async (appointment) => {
  try {
    const query = `?startTime=${appointment.startTime}&dentistId=${appointment.dentistId}`;
    const response = await Axios.delete(
      `appointment/cancel-appointment/${query}`
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

const appointmentService = {
  getAllAppointment,
  getOneAppointment,
  getCustomerAppointment,
  getDentistAppointment,
  updateAppointmentStatus,
  makeAppointment,
  cancelAppointment,
};

export default appointmentService;
