import axios from "axios";
import { getConfig } from "../../utils/getConfig";
import { API_URL } from "../../app/config";

const getAllAppointment = async (user) => {
  const config = getConfig();
  const response = await axios.get(
    `${API_URL}appointment/get-all-appointment`,
    config
  );
  return response.data;
};

const appointmentService = {
  getAllAppointment,
};

export default appointmentService;
