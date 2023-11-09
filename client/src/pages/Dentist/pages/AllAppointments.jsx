import React from 'react'
import TextField from '@mui/material/TextField';
import MUIDataTable from "mui-datatables";


const AllAppointments = () => {
  const columns = ["Name", "Company", "City", "State"];
  const options = {
    filterType: 'checkbox',
  };
  
  const data = [
  ["Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT"],
  ["Bob Herm", "Test Corp", "Tampa", "FL"],
  ["James Houston", "Test Corp", "Dallas", "TX"],
  ];
  return (
    <div className ="p-5 w-full">
      <div>
      <MUIDataTable
        title={"All appoinment"}
        data={data}
        columns={columns}
        options={options}
      />
      </div>
    </div>
  )
}

export default AllAppointments