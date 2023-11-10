import React from "react";
import MUIDataTable from "mui-datatables";

export default function AllRecord() {
  const columns = [
    "Patient",
    "Date of birth",
    "Address",
    "Number",
    {
      name: "Action",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <button onClick={() => handleActionClick(tableMeta.rowIndex)}>
                See
              </button>
            </div>
            
          );
        },
      },
    },
  ];
  const handleActionClick = (rowIndex) => {
    // Do something when the button in the 'Action' column is clicked
    console.log("Action button clicked on row:", rowIndex);
  };

  const options = {
    filterType: "checkbox",
  };

  const data = [
    ["Yonkers", "05-10-2023", "5 Nguyễn Văn Cừ Q:5 P:10", "0000000000"],
    ["Yonkers", "05-10-2023", "5 Nguyễn Văn Cừ Q:5 P:10", "0000000000"],
    ["Yonkers", "05-10-2023", "5 Nguyễn Văn Cừ Q:5 P:10", "0000000000"],
    ["Yonkers", "05-10-2023", "5 Nguyễn Văn Cừ Q:5 P:10", "0000000000"],
  ];

  return (
    <div className="w-full p-5">
      <div>
        <MUIDataTable
          title={"All appoinment"}
          data={data}
          columns={columns}
          options={options}
          components={{ download: "false" }}
        />
      </div>
    </div>
  );
}
