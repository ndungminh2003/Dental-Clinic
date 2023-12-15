import Axios from "../../app/axiosConfig";

const getPrescribeMedicineByRecordId = async (recordId) => {

    try{
      const response = await Axios.get("prescribe-medicine/get-prescribe-medicine",
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

const prescribeMedicineService = {
    getPrescribeMedicineByRecordId,
};

export default prescribeMedicineService;
