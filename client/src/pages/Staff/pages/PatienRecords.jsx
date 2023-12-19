import React from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import Invoice from "../components/Invoice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import serviceUseServices from "../../../features/service/serviceServices";
import invoiceServices from "../../../features/invoice/invoiceServices";
import prescribeMedicineServices from "../../../features/prescribeMedicine/prescribeMedicineServices";
import patientRecordServices from "../../../features/patientRecord/patientRecordServices";

import { addInvoice } from "../../../features/invoice/invoiceSlice";
function SimpleDialog(props) {
  const {
    onClose,
    open,
    customer,
    dentist,
    date,
    invoice,
    service,
    prescribeMedicine,
    recordId,
  } = props;
  const dispatch = useDispatch();
  const [total, setTotal] = React.useState();
  const handleClose = () => {
    onClose();
  };

  const getTotal = (e) => {
    setTotal(e);
  };
  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.000`;
    return formattedDateTime;
  };
  useEffect(() => {
    if (total && !invoice?.length) {
      let data = {
        recordId: recordId,
        date_time: getCurrentDateTime(),
        status: "Chưa thanh toán",
        total: total,
        staffId: 1,
      };
      dispatch(addInvoice(data));
    }
  }, [total, recordId]);
  const [openInvoice, setOpenInvoice] = React.useState(false);
  const handleCloseInvoice = () => {
    setOpenInvoice(false);
  };
  const handleListItemClick = (value) => {
    onClose(value);
  };
  const handleInvoiceClick = () => {
    setOpenInvoice(true);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="w-[500px] p-10">
        <h1 className=" text-center text-2xl font-semibold pb-10">
          SEE MEDICAL RECORD
        </h1>
        <div className="flex items-center grow">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Patient</label>
          </div>
          <input
            type="text"
            value={customer}
            disabled="true"
            className={` w-3/4  px-3 py-2 rounded-md  border border-gray-300	`}
          ></input>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Doctor</label>
          </div>
          <input
            type="text"
            value={dentist}
            disabled="true"
            className={` w-3/4  px-3 py-2 rounded-md border border-gray-300	`}
          ></input>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Day</label>
          </div>
          <input
            type="text"
            value={date}
            disabled="true"
            className={` w-3/4  px-3 py-2 rounded-md border border-gray-300	`}
          ></input>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Service</label>
          </div>
          <div className="w-3/4">
            <input
              type="text"
              disabled="true"
              value={service && service.map((item) => item.serviceName)}
              className={` w-full  px-3 py-2 rounded-md border border-gray-300	`}
            ></input>
          </div>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Medicine</label>
          </div>
          <div className="w-3/4">
            {prescribeMedicine &&
              prescribeMedicine.map((medName, index) => (
                <div className="m-1 flex grow" key={index}>
                  <input
                    type="text"
                    value={medName.medicineName}
                    disabled="true"
                    className={` w-2/3  px-3 py-2 rounded-md border border-gray-300	`}
                  ></input>
                  <input
                    type="text"
                    value={medName.quantity}
                    disabled="true"
                    className={` w-1/3 ml-1  px-3 py-2 rounded-md border border-gray-300	`}
                  ></input>
                </div>
              ))}
          </div>
        </div>

        <div className="text-right mt-5">
          <button
            onClick={handleInvoiceClick}
            className="bg-sky-500 rounded-md px-3 py-2 mr-2"
          >
            {invoice && !invoice.length ? "Add Invoice" : "See Invoice"}
          </button>
          <button
            onClick={() => handleListItemClick("hi")}
            className="bg-neutral-300 rounded-md px-3 py-2"
          >
            Close
          </button>
        </div>
        <Invoice
          open={openInvoice}
          onClose={handleCloseInvoice}
          services={service}
          medicine={prescribeMedicine}
          getTotal={getTotal}
          recordId={recordId}
        />
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  customer: PropTypes.string,
  dentist: PropTypes.string,
  date: PropTypes.string,
  recordId: PropTypes.number,
  service: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.float,
      serviceName: PropTypes.string,
    })
  ),
  prescribeMedicine: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.float,
      quantity: PropTypes.number,
      medicineName: PropTypes.string,
    })
  ),
  invoice: PropTypes.arrayOf(
    PropTypes.shape({
      date_time: PropTypes.string,
      total: PropTypes.number,
      status: PropTypes.string,
      id: PropTypes.number,
    })
  ),
};

export default function AllAppointments() {
  let { error, loading, success } = useSelector((state) => state.auth);
  const handleClose = (value) => {
    setOpen(false);
  };
  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "customerName",
      label: "Customer",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "dentistName",
      label: "Dentist",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "date_time",
      label: "Time",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "symptom",
      label: "Symtom",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "diagnostic",
      label: "Diagnostic",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "advice",
      label: "Advice",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "Action",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <div>
              <button onClick={() => handleActionClick({ dataIndex })}>
                See
              </button>
            </div>
          );
        },
      },
    },
  ];
  useEffect(() => {
    fetchPatientRecordData();
  },[error, loading, success]);
  
  const fetchPatientRecordData = async () => {
    try {
      const response = await patientRecordServices.getAllPatientRecord();
      setPatientRecordData(response);
    } catch (error) {
      console.log(error);
    }
  };
  const [allData, setAllData] = useState([{
    customer: "",
    dentist: "",
    date: "",
    status: "",
    service: ["null"],
    prescribeMedicine: ["null"],
    recordId: "",
  }]);
  const [open, setOpen] = useState(false);
  const [dataDialog, setDataDialog] = useState(
    {
      customer: "",
      dentist: "",
      date: "",
      status: "",
      service: ["null"],
      prescribeMedicine: ["null"],
      recordId: "",
    }
  );
  const [patientRecordData,setPatientRecordData] = useState();
  const [bool,setBool]= useState(false);
  
  useEffect(()=>{
    if(patientRecordData && !bool){
      let dateObject; // Declare dateObject with let
      patientRecordData.map((item) => {
        fetchData(item.id)
        dateObject = new Date(item.date_time);
        const newData = {
          customer: item.customerName,
          dentist: item.dentistName,
          date: dateObject.toISOString().split('T')[0],
          recordId: item.id,
        }
        setAllData(prevData => [...prevData, newData]);
        setBool(true);
      });
    }
  },[patientRecordData])

  const fetchData = async (recordId) => {
    try {
      const [serviceResponse, invoiceResponse, prescribeMedicineResponse] = await Promise.all([
        serviceUseServices.getServiceUseByRecordId(recordId),
        invoiceServices.getInvoiceByRecordId(recordId),
        prescribeMedicineServices.getPrescribeMedicineByRecordId(recordId),
      ]);
      setAllData((prevData) => {
        return prevData.map((item) => {
          if (item.recordId === recordId) {
            return {
              ...item,
              invoice: invoiceResponse,
              service: serviceResponse,
              prescribeMedicine: prescribeMedicineResponse,
            };
          }
          return item;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("Dia",dataDialog)
  },[dataDialog])

  const handleActionClick = (row) => {
    let recordId = patientRecordData[row.dataIndex].id;
    setDataDialog(allData.find(item => item.recordId === recordId))
    setOpen(true);
  };

  const options = {
    filterType: "checkbox",
    download: false,
    print: false,
  };

  const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableBodyCell: {
          styleOverrides: {
            root: {
              textAlign: "center",
              overflow: "Hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            },
          },
        },
      },
    });
  return (
    <div className="w-full p-5">
      <div>
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title={"Patient record"}
            data={patientRecordData}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        customer={dataDialog.customer}
        dentist={dataDialog.dentist}
        date={dataDialog.date}
        service={dataDialog.service}
        prescribeMedicine={dataDialog.prescribeMedicine}
        invoice={dataDialog.invoice}
        recordId={dataDialog.recordId}
      />
    </div>
  );
}
