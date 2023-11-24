import React from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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

const AllAppointments = () => {
  const columns = [
    "Appointment date",
    "Appointment time",
    "Patient name",
    {
      name: "Adress",
      options: { display: false },
    },
    "Number",
    {
      name: "Gender",
      options: { display: false },
    },
    "Status",
  ];

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
              paddingRight: "25px",
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
    </div>
  );
};

export default AllAppointments;
