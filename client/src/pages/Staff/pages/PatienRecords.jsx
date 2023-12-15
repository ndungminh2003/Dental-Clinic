import React from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import Invoice from "../components/Invoice";
import { useDispatch, useSelector } from "react-redux";
import { getAllPatientRecord } from "../../../features/patientRecord/patientRecordSlice";
import { useEffect, useState } from "react";
import { getServiceUseByRecordId } from "../../../features/service/serviceSlice";
import { getPrescribeMedicineByRecordId } from "../../../features/prescribeMedicine/prescribeMedicineSlice";
import { getInvoiceByRecordId } from "../../../features/invoice/invoiceSlice";

const data = [
  {
    index: 0,
    values: [
      "Yonkers",
      "Jack1",
      "05-10-2023",
      "Fever, cough, sore throat",
      "Get plenty of rest. ",
      "COVID-19",
    ],
    status: "Đã thanh toán",
    services: {
      name: ["tooth filling", "service 2", "service 1", "service 0"],
      servicePrices: ["100.000", "100.000", "100.000", "200.000"],
    },
    medicine: {
      name: ["Med 0", "Med 5", "Med 1", "Med 2"],
      quantity: [1, 2, 3, 4],
      Prices: ["100.000", "100.000", "100.000", "200.000"],
    },
  },
  {
    index: 1,
    values: [
      "Yonkers",
      "Jack2",
      "05-10-2023",
      "Fever, cough, sore throat",
      "Get plenty of rest. ",
      "COVID-19",
    ],
    status: "Chưa thanh toán",
    services: {
      name: ["tooth filling", "service 2", "service 1", "service 0"],
      servicePrices: ["100.000", "100.000", "100.000", "200.000"],
    },
    medicine: {
      name: ["Med 0", "Med 5", "Med 1", "Med 2"],
      quantity: [1, 2, 3, 4],
      Prices: ["100.000", "100.000", "100.000", "200.000"],
    },
  },
  {
    index: 2,
    values: [
      "Yonkers",
      "Jack3",
      "05-10-2023",
      "Fever, cough, sore throat",
      "Get plenty of rest. ",
      "COVID-19",
    ],
    status: "Chưa thanh toán",
    services: {
      name: ["tooth filling", "service 2", "service 1", "service 0"],
      servicePrices: ["100.000", "100.000", "100.000", "200.000"],
    },
    medicine: {
      name: ["Med 0", "Med 5", "Med 1", "Med 2"],
      quantity: [1, 2, 3, 4],
      Prices: ["100.000", "100.000", "100.000", "200.000"],
    },
  },
  {
    index: 3,
    values: [
      "Yonkers",
      "Jack4",
      "05-10-2023",
      "Fever, cough, sore throat",
      "Get plenty of rest. ",
      "COVID-19",
    ],
    status: "Chưa thanh toán",
    services: {
      name: ["tooth filling", "service 2", "service 1", "service 0"],
      servicePrices: ["100.000", "100.000", "100.000", "200.000"],
    },
    medicine: {
      name: ["Med 0", "Med 5", "Med 1", "Med 2"],
      quantity: [1, 2, 3, 4],
      Prices: ["100.000", "100.000", "100.000", "200.000"],
    },
  },
];

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
  } = props;
  const handleClose = () => {
    onClose();
  };
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
          {invoice && invoice[0].status === "Chưa thanh toán" ? (
            <button className="bg-yellow-300 rounded-md px-3 py-2 mr-2">
              Pay
            </button>
          ) : (
            <button
              onClick={() => handleListItemClick("hi")}
              className="bg-sky-500 rounded-md px-3 py-2 mr-2"
            >
              Already Paid
            </button>
          )}
          <button
            onClick={handleInvoiceClick}
            className="bg-sky-500 rounded-md px-3 py-2 mr-2"
          >
            Invoice
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
          status ={invoice && invoice[0].status}
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
    })
  ),
};

export default function AllAppointments() {
  const dispatch = useDispatch();
  const {
    patientRecord: patientRecordData,
    loading: patientRecordLoading,
    success: patientRecordSuccess,
    error: patientRecordError,
  } = useSelector((state) => state.patientRecord);

  const {
    invoice: invoiceData,
    loading: invoiceLoading,
    success: invoiceSuccess,
    error: invoiceError,
  } = useSelector((state) => state.invoice);

  const {
    service: serviceData,
    loading: serviceLoading,
    success: serviceSuccess,
    error: serviceError,
  } = useSelector((state) => state.service);

  const {
    prescribeMedicine: prescribeMedicineData,
    loading: prescribeMedicineLoading,
    success: prescribeMedicineSuccess,
    error: prescribeMedicineError,
  } = useSelector((state) => state.prescribeMedicine);

  useEffect(() => {
    dispatch(getAllPatientRecord());
  }, []);
  useEffect(() => {
    console.log(patientRecordData);
  }, [patientRecordData]);

  const [dataDialog, setDataDialog] = useState({
    customer: "",
    dentist: "",
    date: "",
    status: "",
    service: ["null"],
    prescribeMedicine: ["null"],
  });
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState([""]);

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

  const handleActionClick = (row) => {
    let recordId = patientRecordData[row.dataIndex].id;
    dispatch(getServiceUseByRecordId(recordId));
    dispatch(getPrescribeMedicineByRecordId(recordId));
    dispatch(getInvoiceByRecordId(recordId));
    console.log("data");
    console.log(invoiceData);
    const dateObject = new Date(patientRecordData[row.dataIndex].date_time);
    setDataDialog((prevData) => ({
      invoice: invoiceData,
      customer: patientRecordData[row.dataIndex].customerName,
      dentist: patientRecordData[row.dataIndex].dentistName,
      date: dateObject.toISOString().split("T")[0],
      service: serviceData,
      prescribeMedicine: prescribeMedicineData,
    }));
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
      />
    </div>
  );
}
