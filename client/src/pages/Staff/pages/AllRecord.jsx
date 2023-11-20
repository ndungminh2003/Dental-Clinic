import React from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import Record from "../components/Records";

import { TextField, Autocomplete } from "@mui/material";
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

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
    setOpenr(true);
  };


  const [openr, setOpenr] = React.useState(false);
  const [valuesr, setValuesr] = React.useState([""]);

  const [selectedValuer, setSelectedValuer] = React.useState();
  const handleCloser = (value) => {
    setOpenr(false);
    setSelectedValuer(value);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="w-[300px] p-10">
        <h1 className=" text-center text-2xl font-semibold pb-10">
          MEDICAL RECORD HISTORY 
        </h1>
        <div className ="flex items-center">
          <h1 className ="mr-5">1</h1>
          <button 
            onClick={() => handleListItemClick("hi")}
            className ="bg-sky-500 rounded-md px-3 py-2">
            10/10/2020
          </button>
        </div>
        <div className ="flex items-center mt-5">
          <h1 className ="mr-5">1</h1>
          <button className ="bg-sky-500 rounded-md px-3 py-2">
            10/10/2020
          </button>
        </div>
        <div className ="flex items-center mt-5">
          <h1 className ="mr-5">1</h1>
          <button className ="bg-sky-500 rounded-md px-3 py-2">
            10/10/2020
          </button>
        </div>
        <div className ="flex items-center mt-5">
          <h1 className ="mr-5">1</h1>
          <button className ="bg-sky-500 rounded-md px-3 py-2">
            10/10/2020
          </button>
        </div>
      </div>
      <Record
        selectedValue={selectedValuer}
        open={openr}
        onClose={handleCloser}
        values={valuesr}
      />
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
};

export default function AllRecord () {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState([""]);

  const [selectedValue, setSelectedValue] = React.useState();
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
                See
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

