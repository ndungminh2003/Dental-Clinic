import React from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllAppointment } from "../../../features/appointment/appointmentSlice";
import { useEffect } from "react";

export default function AllAppointments() {
  const dispatch = useDispatch();
  const { appointment, loading, success, error } = useSelector(
    (state) => state.appointment
  );
  useEffect(() => {
    dispatch(getAllAppointment());
  }, []);
  useEffect(() => {
    console.log(appointment);
  }, [appointment]);
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
      name: "staffName",
      label: "Staff",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    download: false,
    print: false,
    onRowsDelete: (rowsDeleted) => {
      console.log("Rows deleted:", rowsDeleted.data[0].dataIndex);
    },
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
        MUIDataTableHeadCell: {
          root: {
            textTransform: "lowercase",
            "&:first-child": {
              textTransform: "capitalize", // Optional: capitalize the first letter
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
            data={appointment}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
    </div>
  );
}
