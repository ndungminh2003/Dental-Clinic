import Axios from "../../app/axiosConfig";

const getAllScheduleAvailable = async (user) => {
  try{
    const response = await Axios.get(`schedule/get-all-dentist-schedule-available`);
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
    getAllScheduleAvailable,
};

export default scheduleService;
