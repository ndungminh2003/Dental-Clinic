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
import { createServiceUse } from "../../../features/serviceUse/serviceUseSlice";
import { createPrescribeMedicine } from "../../../features/prescribeMedicine/prescribeMedicineSlice";
import CancelIcon from '@mui/icons-material/Cancel';
import { TextField, Autocomplete } from "@mui/material";

const emails = ["username@gmail.com", "user02@gmail.com"];

const SimpleDialog = (props) => {
  const {
    onClose,
    selectedValue,
    open,
    values,
    services,
    medicines,
    newPatientRecord,
    user
  } = props;
  const [medicineRows, setMedicineRows] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [symptom, setSymptom] = useState("");
  const [advice, setAdvice] = useState("");
  const [diagnostic, setDiagnostic] = useState("");

  React.useEffect(() => {
    selectedOptions.map((selected) => {
      services.map((service) => {
        if (selected === service.name) {
          dispatch(
            createServiceUse({
              serviceId: service.id,
              recordId: newPatientRecord[0].id,
            })
          );
        }
      });
    });
    medicineRows.map((row) => {
      medicines.map((medicine) => {
        if (medicine.name === row.medicine) {
          dispatch(
            createPrescribeMedicine({
              medicineId: medicine.id,
              recordId: newPatientRecord[0].id,
              quantity: row.quantity,
            })
          );
          
        }
      });
    });
  }, [newPatientRecord]);

  const dispatch = useDispatch();

  const addMedicineRow = () => {
    setMedicineRows([...medicineRows, { medicine: medicines[0].name, quantity: 1 }]);
  };
  const handleClose = () => {
    onClose(selectedValue);
  };

  const deleteMedicineRow = (idx) => {
    const newRows = [...medicineRows];
    newRows.splice(idx, 1);
    setMedicineRows(newRows);
  };

  const handleListItemClick = (values) => {
    
    onClose(values);

    let date = new Date();
    date.setUTCHours(date.getUTCHours() + 7);
    let year = date.getUTCFullYear();
    let month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
    let day = ("0" + date.getUTCDate()).slice(-2);
    let hours = ("0" + date.getUTCHours()).slice(-2);
    let minutes = ("0" + date.getUTCMinutes()).slice(-2);
    let seconds = ("0" + date.getUTCSeconds()).slice(-2);
    let date_time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const patientRecord = {
      symptom: symptom,
      advice: advice,
      diagnostic: diagnostic,
      date_time: date_time,
      dentistId: user.id,
      customerId: values.customerId,
    };

    dispatch(createPatientRecord(patientRecord));
    setSymptom("");
    setAdvice("");
    setDiagnostic("");
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
            value={user.name}
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
        <label className="font-mono rounded-md text-center">Medicine</label>
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
                className="block w-4/5 mt-1 mr-2 ml-8 p-2 border border-gray-300 rounded-md shadow-sm"
              >
                {medicines.map((medicine) => (
                  <option key={medicine.id} value={medicine.name}>
                    {medicine.name}
                  </option>
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
                className="block w-1/5 mt-1 mr-2 p-2 border border-gray-300 rounded-md shadow-sm"
                min="1"
              />
              <button
                type="button"
                onClick={() => deleteMedicineRow(idx)}
                className="text-red-500 ml-2"
              >
                <CancelIcon/>
              </button>
            </div>
          ))}
            </div>
            <button
              type="button"
              onClick={addMedicineRow}
              className="text-sky-600 text-sm"
            >
              + Add Medicine
            </button>
          </div>
        </div>
        <div className="text-right mt-5">
          <button
            onClick={() => handleListItemClick(values)}
            className="bg-sky-500 rounded-md px-3 py-2"
          >
            Save
          </button>
        </div>
      </div>
    </Dialog>
  );
};

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
};

function formatDate(dateString) {
  const dateObj = new Date(dateString);

  const day = String(dateObj.getUTCDate()).padStart(2, '0');
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
  const year = String(dateObj.getUTCFullYear());
  const hours = String(dateObj.getUTCHours()).padStart(2, '0');
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getUTCSeconds()).padStart(2, '0');

  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}

const processAppointments = (responseDentistAppointment, responseCustomer) => {
  const appointmentsWithCustomer = responseDentistAppointment.map(
    (appointment) => {
      const correspondingCustomer = responseCustomer.find(
        (customer) => customer.id === appointment.customerId
      );

      return {
        ...appointment,
        startTime: formatDate(appointment.startTime),
        endTime: formatDate(appointment.endTime),
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
  const [newPatientRecord1, setNewPatientRecord1] = React.useState([]);

  const { error, loading, success, newPatientRecord } = useSelector(
    (state) => state.patientRecord
  );
  
  const { user } = useSelector(
    (state) => state.auth
  );
  

  const fetchData = async (dentistId) => {
    try {
      const [
        responseDentistAppointment,
        responseCustomer,
        responseService,
        responseMedicine,
      ] = await Promise.all([
        appointmentService.getDentistAppointment(dentistId),
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
      setNewPatientRecord1(newPatientRecord);
    } catch (error) {
      console.log(error);
    }
  };

  const [dataAppointment, setDataAppointment] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [medicines, setMedicines] = React.useState([]);

  React.useEffect(() => {
    fetchData(user.id);
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
        newPatientRecord={newPatientRecord1}
        user = {user}
      />
    </div>
  );
};

export default AllAppointments;
