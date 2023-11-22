import React from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SeeMedication from "../components/SeeMedication";
import ChangeMedication from "../components/ChangeMedication";
const data = [
  {
    index: 0,
    values: [
      "TradeCode 99",
      "Amoxicillin",
      "It is a commonly used medicine that can help treat pain and reduce a high temperature (fever)",
      "Used to treat bacterial infections such as strep throat, diabetic infections, pneumonia, etc.",
      "05-10-2023",
      "Cap", 
      "10.000",
      "1234"
    ],
  },
  {
    index: 1,
    values: [
      "TradeCode 97",
      "Amoxicillin",
      "It is a commonly used medicine that can help treat pain and reduce a high temperature (fever)",
      "Used to treat bacterial infections such as strep throat, diabetic infections, pneumonia, etc.",
      "05-10-2023",
      "Cap", 
      "10.000",
      "1234"
    ],
  },
  {
    index: 2,
    values: [
      "TradeCode 96",
      "Amoxicillin",
      "It is a commonly used medicine that can help treat pain and reduce a high temperature (fever)",
      "Used to treat bacterial infections such as strep throat, diabetic infections, pneumonia, etc.",
      "05-10-2023",
      "Cap", 
      "10.000",
      "1234"
    ],
  },
  {
    index: 3,
    values: [
      "TradeCode 5",
      "Amoxicillin",
      "It is a commonly used medicine that can help treat pain and reduce a high temperature (fever)",
      "Used to treat bacterial infections such as strep throat, diabetic infections, pneumonia, etc.",
      "05-10-2023",
      "Cap", 
      "10.000",
      "1234"
    ],
  },
];

export default function AllMedications () {
  const [openSee, setOpenSee] = React.useState(false);
  const [openChange, setOpenChange] = React.useState(false);

  const [values, setValues] = React.useState([""]);

  const [selectedValue, setSelectedValue] = React.useState();
  const handleCloseSee = () => {
    setOpenSee(false);
  };
  const handleCloseChange = () => {
    setOpenChange(false);
  };
  const columns = [
    "Code medicine",
    "Medicine name",
    {
      name: "Description",
      options: {display: false}
    },
    {
      name: "Indication",
      options: {display: false}
    },
    "Expiration date",
    {
      name: "Unit",
      options: {display: false}
    },
    "Price",
    "Quantity",
    {
      name: "Action",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <div>
              <button 
                className ="mr-5"
                onClick={() => handleActionClickSee({ dataIndex })}>
                See
              </button>
              <button onClick={() => handleActionClickChange({ dataIndex })}>
                Change
              </button>
              
            </div>
          );
        },
      },
    },
  ];

  const handleActionClickSee = (row) => {
    // Do something when the button in the 'Action' column is clicked
    setOpenSee(true);
    console.log("1:", data[row.dataIndex].values);
    setValues(data[row.dataIndex].values);
  };

  const handleActionClickChange = (row) => {
    // Do something when the button in the 'Action' column is clicked
    setOpenChange(true);
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
    <div className="w-full px-5 py-10">
      <div>
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title={"All medication"}
            data={data.map((entry) => entry.values)}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
      <SeeMedication
        open={openSee}
        onClose={handleCloseSee}
        values={values}
      />
      <ChangeMedication
        open={openChange}
        onClose={handleCloseChange}
        values={values}
      />
    </div>
  );
};

 
