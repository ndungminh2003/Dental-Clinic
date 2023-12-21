import React from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SeeMedication from "../components/SeeMedication";
import ChangeMedication from "../components/ChangeMedication";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMedicine } from "../../../features/medicine/medicineSlice";
import medicineServices from "../../../features/medicine/medicineServices";
import { ToastContainer, toast } from "react-toastify";

export default function AllMedications() {
  const dispatch = useDispatch();

  let { error, loading, success } = useSelector((state) => state.medicine);

  const fetchData = async () => {
    try {
      const response = await medicineServices.getAllMedicine();
      setMedicine(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [medicines, setMedicine] = useState([]);

  useEffect(() => {
    fetchData();
  }, [error, loading, success]);

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
    setValues(medicines[row.dataIndex]);
  };

  const handleActionClickChange = (row) => {
    setOpenChange(true);
    setValues(medicines[row.dataIndex]);
  };

  const options = {
    filterType: "checkbox",
    download: false,
    print: false,
    onRowsDelete: (rowsDeleted) => {
      for (let i = 0; i < rowsDeleted.data.length; i++) {
        dispatch(deleteMedicine(medicines[rowsDeleted.data[i].dataIndex].id));
      }
      toast.success("Successfully deleted medicine");
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
    <>
      <div className="w-full px-5 py-10">
        <div>
          <ThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={"All medication"}
              data={medicines}
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
      <ToastContainer />
    </>
  );
}
