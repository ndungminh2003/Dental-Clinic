import React from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteUser from "../components/DeleteUser";
import BlockUser from "../components/BlockUser";
const data = [
  {
    index: 0,
    values: [
      "Nguyễn Văn A",
      "05-10-2023",
      "Client", 
      "Active",
    ],
  },
  {
    index: 1,
    values: [
      "Nguyễn Văn B",
      "05-10-2023",
      "Client", 
      "Active",
    ],
  },
  {
    index: 2,
    values: [
      "Nguyễn Văn C",
      "05-10-2023",
      "Client", 
      "Active",
    ],
  },
  {
    index: 3,
    values: [
      "Nguyễn Văn D",
      "05-10-2023",
      "Client", 
      "Active",
    ],
  },
];

export default function AllUsers () {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openBlock, setOpenBlock] = React.useState(false);
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleCloseBlock = () => {
    setOpenBlock(false);
  };
  const columns = [
    "Account  name",
    "Creation date",
    "Type",
    "Status",
    {
      name: "Action",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <div>
              <button 
                className ="mr-5"
                onClick={() => handleActionClickDelete({ dataIndex })}>
                Delete
              </button>
              <button onClick={() => handleActionClickBlock({ dataIndex })}>
                Block
              </button>
              
            </div>
          );
        },
      },
    },
  ];

  const handleActionClickDelete = (row) => {
    // Do something when the button in the 'Action' column is clicked
    setOpenDelete(true);
    console.log("1:", data[row.dataIndex].values);
  };

  const handleActionClickBlock = (row) => {
    // Do something when the button in the 'Action' column is clicked
    setOpenBlock(true);
    console.log("1:", data[row.dataIndex].values);
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
              marginRight: "7px",
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
            title={"All users"}
            data={data.map((entry) => entry.values)}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
      <DeleteUser
        open={openDelete}
        onClose={handleCloseDelete}
      />
      <BlockUser
        open={openBlock}
        onClose={handleCloseBlock}
      />
    </div>
  );
};

 
