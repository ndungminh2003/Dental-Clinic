import React from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import Invoice from "../components/Invoice";
import { useDispatch, useSelector } from "react-redux";
import { getAllPatientRecord } from "../../../features/patientRecord/patientRecordSlice";
import { useEffect } from "react";

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
      name: ["tooth filling", "service 2", "service 1" , "service 0"],
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
      name: [ "Med 0", "Med 5", "Med 1", "Med 2"],
      quantity: [1, 2, 3, 4],
      Prices: ["100.000", "100.000", "100.000", "200.000"],
    },
  },
];

function SimpleDialog(props) {
  const { onClose, open, values ,serviceName,medicine,status,services } = props;
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
            value={values[2]}
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
            value={"Nguyễn Văn A"}
            disabled="true"
            className={` w-3/4  px-3 py-2 rounded-md border border-gray-300	`}
          ></input>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Day</label>
          </div>
          <input
            type="date"
            disabled="true"
            className={` w-3/4  px-3 py-2 rounded-md border border-gray-300	`}
          ></input>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Service</label>
          </div>
          <div className ="w-3/4">
            <input
              type="text"
              value={serviceName}
              disabled="true"
              className={` w-full  px-3 py-2 rounded-md border border-gray-300	`}
            ></input>
          </div>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Medicine</label>
          </div>
          <div className ="w-3/4">
            {medicine && medicine.name.map((medName, index) => (
              <div className="m-1 flex grow"key={index}>
                <input
                  type="text"
                  value={medName}
                  disabled="true"
                  className={` w-2/3  px-3 py-2 rounded-md border border-gray-300	`}
                ></input>
                <input
                  type="text"
                  value={medicine.quantity[index]}
                  disabled="true"
                  className={` w-1/3 ml-1  px-3 py-2 rounded-md border border-gray-300	`}
                ></input>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-right mt-5">
          {status === "Chưa thanh toán" 
          ?
          <button
            onClick={() => handleListItemClick("hi")}
            className="bg-sky-500 rounded-md px-3 py-2 mr-2"
          >
            Already Paid
          </button>
          :
          <button
            className="bg-yellow-300 rounded-md px-3 py-2 mr-2"
          >
            Pay
          </button>
          }
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
          services={services}
          medicine={medicine}
          status ={status}
        />
        
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  values: PropTypes.array.isRequired,
  serviceName: PropTypes.array.isRequired,
  medicine: PropTypes.shape({
    name: PropTypes.array.isRequired,
    quantity: PropTypes.array.isRequired,
    price: PropTypes.array.isRequired,
  }),
  services: PropTypes.shape({
    name: PropTypes.array.isRequired,
    price: PropTypes.array.isRequired,
  }),
  status: PropTypes.string.isRequired,
};

export default function AllAppointments () {
  const dispatch = useDispatch();
  const { patientRecord, loading, success, error } = useSelector(
    (state) => state.patientRecord
  );
  useEffect(() => {
    dispatch(getAllPatientRecord());
  }, []);
  useEffect(() => {
    console.log(patientRecord);
  }, [patientRecord]); 
  const [serviceName, setServiceName] = React.useState();
  const [medicine, setMedicine] = React.useState();
  const [services, setServices] = React.useState();
  const [status, setStatus] = React.useState();

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
        display: false ,
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
    setOpen(true);
    setValues(data[row.dataIndex].values);
    setServiceName((data[row.dataIndex].services.name));
    setMedicine(data[row.dataIndex].medicine);
    setServices(data[row.dataIndex].services);
    setStatus(data[row.dataIndex].status);
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
            data={patientRecord}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        values={values}
        serviceName={serviceName}
        medicine={medicine}
        status ={status}
        services={services}
      />
    </div>
  );
};

