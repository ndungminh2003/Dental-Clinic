import Axios from "../../app/axiosConfig";

const getInvoiceByRecordId = async (recordId) => {
  try {
    const response = await Axios.get("invoice/get-record-invoice", {
      params: { recordId },
    });
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
const addInvoice = async (invoice) => {
  try {
    const response = await Axios.post(
      "invoice/add-invoice",
      invoice
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
const updateInvoiceStatus = async (invoiceId) => {
  try {
    const response = await Axios.put("invoice/update-invoice-status", invoiceId);
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
const InvoiceService = {
  getInvoiceByRecordId,
  addInvoice,
  updateInvoiceStatus
};

export default InvoiceService;
