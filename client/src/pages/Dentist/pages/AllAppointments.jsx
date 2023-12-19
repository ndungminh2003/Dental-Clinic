import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import appointmentService from "../../../features/appointment/appointmentServices";
import customerService from "../../../features/customer/customerServices";
import serviceService from "../../../features/service/serviceServices";
import medicineService from "../../../features/medicine/medicineServices";
import { createPatientRecord } from "../../../features/patientRecord/patientRecordSlice";
import { useDispatch, useSelector } from "react-redux";

import { TextField, Autocomplete } from "@mui/material";

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const {
    onClose,
    selectedValue,
    open,
    values,
    services,
    medicines,
    newPatientRecord,
  } = props;
  const [medicineRows, setMedicineRows] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [symptom, setSymptom] = useState("");
  const [advice, setAdvice] = useState("");
  const [diagnostic, setDiagnostic] = useState("");

  console.log(newPatientRecord);

  const dispatch = useDispatch();

  const addMedicineRow = () => {
    setMedicineRows([...medicineRows, { medicine: "", quantity: 1 }]);
  };
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);

    const currentDate = new Date();
    const sqlDateTime = currentDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    console.log(sqlDateTime);

    // Get the current date and time in the local timezone
    const currentDate1 = new Date();

    // Define the options for formatting the date and time
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Ho_Chi_Minh", // Set the timezone to Vietnam's timezone
    };

    // Format the date and time for Vietnam timezone
    const vietnamDateTime = currentDate1
      .toLocaleString("en-US", options)
      .replace(/\//g, "-");

    console.log(vietnamDateTime);

    const patientRecord = {
      symptom: symptom,
      advice: advice,
      diagnostic: diagnostic,
      dentistId: 1,
      date_time: '2023-12-19 16:30:00',
      customerId: values.customerId,
    };

    dispatch(createPatientRecord(patientRecord));
    console.log(newPatientRecord);
  };

  const handleOptionChange = (event, newValues) => {
    setSelectedOptions(newValues);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="w-[500px] p-10">
        <h1 className=" text-center text-2xl font-semibold pb-10">
          ADD RECORD
        </h1>
        <div className="flex items-center grow">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Patient</label>
          </div>
          <input
            type="text"
            value={values.patientName}
            disabled="true"
            className={` w-3/4  px-3 py-2 rounded-md  border border-gray-300	`}
          ></input>
        </div>
        <div className="flex  grow mt-3">
          <div className="flex w-2/3 items-center">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Phone</label>
            </div>
            <input
              type="text"
              value={values.phoneNumber}
              disabled="true"
              className={` w-3/4 ml-[50px] px-3 py-2 rounded-md border border-gray-300	`}
            ></input>
          </div>
          <div className="flex w-1/3 items-center ml-3">
            <div className="w-1/2">
              <label className="font-mono rounded-md text-center	">Gender</label>
            </div>
            <input
              type="text"
              value={values.gender}
              disabled="true"
              className={` w-1/2  px-3 py-2 rounded-md  border border-gray-300	`}
            ></input>
          </div>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Address</label>
          </div>
          <input
            type="text"
            value={values.address}
            disabled="true"
            className={` w-3/4  px-3 py-2 rounded-md border border-gray-300	`}
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
            <label className="font-mono rounded-md text-center	">Service</label>
          </div>
          <Autocomplete
            sx={{ marginLeft: "26px", width: "100%" }}
            multiple
            options={services.map((data) => data.name)}
            getOptionLabel={(option) => option}
            disableCloseOnSelect
            value={selectedOptions}
            onChange={handleOptionChange}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" placeholder="Add" />
            )}
          />
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Symtom</label>
          </div>
          <input
            type="text"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            className={` w-3/4  px-3 py-2 rounded-md border border-gray-300	`}
          ></input>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Advice</label>
          </div>
          <input
            type="text"
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
            className={` w-3/4  px-3 py-2 rounded-md  border border-gray-300	`}
          ></input>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">
              Diagnostic
            </label>
          </div>
          <input
            value={diagnostic}
            onChange={(e) => setDiagnostic(e.target.value)}
            type="text"
            className={` w-3/4  px-3 py-2 rounded-md border border-gray-300	`}
          ></input>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Medicine</label>
          </div>
          <div>
            <div id="medicineSection">
              {medicineRows.map((row, idx) => (
                <div key={idx} className="flex mb-3">
                  <select
                    name={`medicine-${idx}`}
                    value={row.medicine}
                    onChange={(e) => {
                      const newRows = [...medicineRows];
                      newRows[idx].medicine = e.target.value;
                      setMedicineRows(newRows);
                    }}
                    className="block w-2/3 mt-1 mr-2 p-2  border border-gray-300	 rounded-md shadow-sm"
                  >
                    {medicines.map((medicine) => (
                      <option value={medicine.name}>{medicine.name}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    name={`quantity-${idx}`}
                    value={row.quantity}
                    onChange={(e) => {
                      const newRows = [...medicineRows];
                      newRows[idx].quantity = e.target.value;
                      setMedicineRows(newRows);
                    }}
                    className="block w-1/3 mt-1 mr-2 p-2  border border-gray-300	 rounded-md shadow-sm"
                    min="1"
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addMedicineRow}
              className="text-sky-600	text-sm"
            >
              + Add Medicine
            </button>
          </div>
        </div>
        <div className="text-right mt-5">
          <button
            onClick={() => handleListItemClick("hi")}
            className="bg-sky-500 rounded-md px-3 py-2"
          >
            Save
          </button>
        </div>
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
};

const processAppointments = (responseDentistAppointment, responseCustomer) => {
  const appointmentsWithCustomer = responseDentistAppointment.map(
    (appointment) => {
      const correspondingCustomer = responseCustomer.find(
        (customer) => customer.id === appointment.customerId
      );

      return {
        ...appointment,
        patientName: correspondingCustomer.name,
        phoneNumber: correspondingCustomer.phoneNumber,
        gender: correspondingCustomer.gender,
        address: correspondingCustomer.address,
      };
    }
  );

  return appointmentsWithCustomer;
};

const AllAppointments = () => {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState([""]);

  const { error, loading, success, newPatientRecord } = useSelector(
    (state) => state.patientRecord
  );
  console.log(error);
  console.log(newPatientRecord);

  const fetchData = async () => {
    try {
      const [
        responseDentistAppointment,
        responseCustomer,
        responseService,
        responseMedicine,
      ] = await Promise.all([
        appointmentService.getDentistAppointment(1),
        customerService.getAllCustomer(),
        serviceService.getAllService(),
        medicineService.getAllMedicine(),
      ]);

      const data1 = processAppointments(
        responseDentistAppointment,
        responseCustomer
      );

      setServices(responseService);
      setDataAppointment(data1);
      setMedicines(responseMedicine);
    } catch (error) {
      console.log(error);
    }
  };

  const [dataAppointment, setDataAppointment] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [medicines, setMedicines] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  }, [error, loading, success]);

  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const columns = [
    {
      name: "startTime",
      label: "Start Time",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "endTime",
      label: "End Time",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "patientName",
      label: "Patient Name",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Adress",
      options: { display: false },
    },

    {
      name: "customerId",
      options: { display: false },
    },

    {
      name: "recordId",
      options: { display: false },
    },

    {
      name: "phoneNumber",
      label: "phone number",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Gender",
      options: { display: false },
    },

    {
      name: "status",
      label: "status",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "Action",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <div>
              <button onClick={() => handleActionClick({ dataIndex })}>
                Add record
              </button>
            </div>
          );
        },
      },
    },
  ];

  const handleActionClick = (row) => {
    setOpen(true);
    console.log("1:", dataAppointment[row.dataIndex]);
    setValues(dataAppointment[row.dataIndex]);
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
              paddingRight: "15px",
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
            title={"All appoinment"}
            data={dataAppointment}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        values={values}
        services={services}
        medicines={medicines}
        data={dataAppointment}
        newPatientRecord={newPatientRecord}
      />
    </div>
  );
};

export default AllAppointments;
