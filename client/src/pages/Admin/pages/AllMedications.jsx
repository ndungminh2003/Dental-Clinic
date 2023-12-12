import React from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SeeMedication from "../components/SeeMedication";
import ChangeMedication from "../components/ChangeMedication";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMedicine } from "../../../features/medicine/medicineSlice";

export default function AllMedications() {

  const dispatch = useDispatch();
  const { medicine, loading, success, error } = useSelector(
    (state) => state.medicine
  );

  useEffect(() => {
    dispatch(getAllMedicine());
  }, []);


  const [openSee, setOpenSee] = React.useState(false);
  const [openChange, setOpenChange] = React.useState(false);

  const [values, setValues] = React.useState({});

  const handleCloseSee = () => {
    setOpenSee(false);
  };
  const handleCloseChange = () => {
    setOpenChange(false);
  };

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "expirationDate",
      label: "Expiration Date",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "quantity",
      label: "Quantity",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "price",
      label: "Price",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Action",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <div>
              <button
                className="mr-5"
                onClick={() => handleActionClickSee({ dataIndex })}
              >
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
    setOpenSee(true);
    setValues(medicine[row.dataIndex]);
  };

  const handleActionClickChange = (row) => {
    setOpenChange(true);
    setValues(medicine[row.dataIndex]);
  };

  const options = {
    filterType: "checkbox",
    download: false,
    print: false,
    onRowsDelete: (rowsDeleted) => {
      console.log(medicine[rowsDeleted.data[0].dataIndex].id);
    },
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
            data={medicine}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
      <SeeMedication open={openSee} onClose={handleCloseSee} values={values} />
      <ChangeMedication
        open={openChange}
        onClose={handleCloseChange}
        values={values}
      />
    </div>
  );
}
