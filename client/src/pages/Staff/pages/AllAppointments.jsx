import React from 'react'
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';


const AllAppointments = () => {
  const columns = ["Appointment date","Appointment time", "Patient name" , "Adress",  "Number"];
  const options = {
    filterType: 'checkbox',
    download: false,
    print: false,
  };
  
  const data = [
  ["05-10-2023", "09:10 -> 15h50", "Yonkers", "5 Nguyễn Văn Cừ Q:5 P:10","0000000000"],
  ["05-10-2023", "09:10 -> 15h50", "Yonkers", "5 Nguyễn Văn Cừ Q:5 P:10","0000000000"],
  ["05-10-2023", "09:10 -> 15h50", "Yonkers", "5 Nguyễn Văn Cừ Q:5 P:10","0000000000"],
  ["05-10-2023", "09:10 -> 15h50", "Yonkers", "5 Nguyễn Văn Cừ Q:5 P:10","0000000000"],

  ];
  const getMuiTheme = () => createTheme({
    components: {
      MUIDataTableBodyCell: {
        styleOverrides:{
          root: {
              marginLeft:"0px",
          }
        }
      }
    }
  })
  return (
    <div className ="w-full p-5">
      <div>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"All appoinment"}
          data={data}
          columns={columns}
          options={options}
        />
       </ThemeProvider>
      </div>
    </div>
  )
}

export default AllAppointments