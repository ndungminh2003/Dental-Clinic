import React from 'react'
import TextField from '@mui/material/TextField';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';


const AllAppointments = () => {
  const columns = ["Appointment date", "Patient name",  "Number" , "Adress"];
  const options = {
    filterType: 'checkbox',
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
              marginLeft:"20px",
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
          sx={{backgroundColor: 'blue'}}
        />
       </ThemeProvider>
      </div>
    </div>
  )
}

export default AllAppointments