import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import appointmentService from "../../../features/appointment/appointmentServices";
import { useEffect } from "react";
import formatDate from "../../../utils/formatDate";
import formatTime from "../../../utils/formatTime";
import { useDispatch } from "react-redux";
import { updateAppointmentStatus } from "../../../features/appointment/appointmentSlice";
export default function AllAppointments() {
  const dispatch = useDispatch();
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    appointmentService.getAllAppointment().then((res) => setAppointments(res));
  }, []);
  const handleStatusChange = (e, index) => {
    // appointmentService.updateAppointmentStatus()
    const updateData = {
      dentistId: appointments[index].dentistId,
      startTime: appointments[index].startTime,
      status: e.target.value,
    };
    console.log(appointments[index]);
    console.log(updateData);
    dispatch(updateAppointmentStatus(updateData));
  };
  const columns = [
    {
      name: "startTime",
      label: "Start Time",
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (index) => {
          return (
            <div>
              {formatDate(appointments[index].startTime)}{" "}
              {formatTime(appointments[index].startTime)}
            </div>
          );
        },
      },
    },
    {
      name: "endTime",
      label: "End Time",
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (index) => {
          return (
            <div>
              {formatDate(appointments[index].endTime)}{" "}
              {formatTime(appointments[index].endTime)}
            </div>
          );
        },
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
        customBodyRenderLite: (index) => {
          if (
            appointments[index].status === "Waiting" ||
            appointments[index].status === "In progress"
          ) {
            return (
              <div>
                <select
                  className="px-2 py-1  rounded border border-black"
                  defaultValue={appointments[index].status}
                  onChange={(e) => handleStatusChange(e, index)}
                >
                  <option value="Waiting">Waiting</option>
                  <option value="In progress">In progress</option>
                </select>
              </div>
            );
          }
          return <div>{appointments[index].status}</div>;
        },
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
            data={appointments}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
    </div>
  );
}
