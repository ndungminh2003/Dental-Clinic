import Axios from "../../app/axiosConfig";

const getScheduleAvailableOnDay = async (date) => {
  try {
    const response = await Axios.get(
      `schedule/get-schedule-available-on-day/${date}`
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

const getDentistHaveSchedule = async () => {
  try {
    const response = await Axios.get(`schedule/get-dentist-have-schedule`);
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

const getDentistSchedule = async (dentistId) => {
  try {
    const response = await Axios.get(
      `schedule/get-dentist-schedule/${dentistId}`
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

const scheduleService = {
  getScheduleAvailableOnDay,
  getDentistHaveSchedule,
  getDentistSchedule,
};

export default scheduleService;
