import React, { useState } from 'react';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";


import { TextField, Autocomplete } from "@mui/material";

const emails = ["username@gmail.com", "user02@gmail.com"];

const service = [
  {
    id: 1,
    price: 50,
    name: "Service1",
    description:"Basic dental checkup",
  },
  {
    id: 2,
    price: 60,
    name: "Service2",
    description:"dental filling service",
  },
  {
    id: 3,
    price: 160,
    name: "Service3",
    description:"dental filling service",
  }
];

const data = [
  {
    index: 0,
    values: [
      "05-10-2023",
      "09:15 -> 15h50",
      "Yonkers",
      "4 Nguyễn Văn Cừ Q:5 P:10",
      "0000000000",
      "Male", 
      "cancelled",
    ],
  },
  {
    index: 1,
    values: [
      "06-10-2023",
      "09:00 -> 15h50",
      "Jack",
      "5 Nguyễn Văn Cừ Q:5 P:10",
      "0000000000",
      "Male", 
      "cancelled",
    ],
  },
  {
    index: 2,
    values: [
      "07-10-2023",
      "09:30 -> 15h50",
      "Alice",
      "6 Nguyễn Văn Cừ Q:5 P:10",
      "0000000000",
      "Female", 
      "cancelled",
    ],
  },
  {
    index: 3,
    values: [
      "08-10-2023",
      "09:40 -> 15h50",
      "Blanc",
      "7 Nguyễn Văn Cừ Q:5 P:10",
      "0000000000",
      "Male", 
      "cancelled",
    ],
  },
];


function SimpleDialog(props) {
  const { onClose, selectedValue, open, values } = props;
  const [medicineRows, setMedicineRows] = useState([]);
  const addMedicineRow = () => {
    setMedicineRows([...medicineRows, { medicine: '', quantity: 1 }]);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Implement submission logic here
    console.log('Form data:', medicineRows);
  };
  
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
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
            value={values[2]}
            disabled="true"
            className={` w-3/4  px-3 py-2 rounded-md  border border-gray-300	`}
          ></input>
        </div>
        <div className="flex  grow mt-3">
          <div className ="flex w-2/3 items-center">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Phone</label>
            </div>
            <input
              type="text"
              value={values[4]}
              disabled="true"
              className={` w-3/4 ml-[50px] px-3 py-2 rounded-md border border-gray-300	`}
            ></input>
          </div>
          <div className ="flex w-1/3 items-center ml-3">
            <div className="w-1/2">
              <label className="font-mono rounded-md text-center	">Gender</label>
            </div>
            <input
              type="text"
              value={values[5]}
              disabled="true"
              className={` w-1/2  px-3 py-2 rounded-md  border border-gray-300	`}
            ></input>
          </div>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Adress</label>
          </div>
          <input
            type="text"
            value={values[3]}
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
            sx={{ marginLeft:'26px', width: '100%' }}
            multiple
            options={service.map((data) => data.name) }
            getOptionLabel={(option) => option}
            disableCloseOnSelect
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Add"
              />
            )}
          />
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Symtom</label>
          </div>
          <input
            type="text"
            className={` w-3/4  px-3 py-2 rounded-md border border-gray-300	`}
          ></input>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Advice</label>
          </div>
          <input
            type="text"
            className={` w-3/4  px-3 py-2 rounded-md  border border-gray-300	`}
          ></input>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Diagnostic</label>
          </div>
          <input
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
                    <option value="amoxicillin">Amoxicillin</option>
                    <option value="ibuprofen">Ibuprofen</option>
                    {/* Add other medicine options here */}
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
              className ="text-sky-600	text-sm"
            >
              + Add Medicine
            </button>
          </div>
        </div>
        <div className ="text-right mt-5">
          <button onClick={() => handleListItemClick("hi")} className ="bg-sky-500 rounded-md px-3 py-2">Save</button>
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

const AllAppointments = () => {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState([""]);

  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  const columns = [
    "Appointment date",
    "Appointment time",
    "Patient name",
    {
      name: "Adress",
      options: {display: false}
    },
    "Number",
    {
      name: "Gender",
      options: {display: false}
    },
    "Status",
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
    // Do something when the button in the 'Action' column is clicked
    setOpen(true);
    console.log("1:", data[row.dataIndex].values);
    setValues(data[row.dataIndex].values);
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
            data={data.map((entry) => entry.values)}
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
      />
    </div>
  );
};

export default AllAppointments;
