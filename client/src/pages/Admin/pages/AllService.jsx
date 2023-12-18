import React from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChangeService from "../components/ChangeService";
import { deleteService } from "../../../features/service/serviceSlice";
import serviceServices from "../../../features/service/serviceServices";
import { ToastContainer, toast } from "react-toastify";

export default function AllService() {
  const dispatch = useDispatch();

  let { error, loading, success } = useSelector((state) => state.service);

  const fetchData = async () => {
    try {
      const response = await serviceServices.getAllService();
      setService(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [services, setService] = useState([]);

  useEffect(() => {
    fetchData();
  }, [error, loading, success]);

  const [openChange, setOpenChange] = React.useState(false);

  const [values, setValues] = React.useState({});

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
      name: "description",
      label: "Description",
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
              <button onClick={() => handleActionClickChange({ dataIndex })}>
                Change
              </button>
            </div>
          );
        },
      },
    },
  ];

  const handleActionClickChange = (row) => {
    setOpenChange(true);
    setValues(services[row.dataIndex]);
  };

  const options = {
    filterType: "checkbox",
    download: false,
    print: false,
    onRowsDelete: (rowsDeleted) => {
      for (let i = 0; i < rowsDeleted.data.length; i++) {
        // dispatch(deleteService(services[rowsDeleted.data[i].dataIndex].id));
      }
      toast.success("Xóa dịch vụ thành công");
    },
  };

  const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableBodyCell: {
          styleOverrides: {
            root: {
              paddingRight: "px",
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
              data={services}
              columns={columns}
              options={options}
            />
          </ThemeProvider>
        </div>
        <ChangeService
          open={openChange}
          onClose={handleCloseChange}
          values={values}
        />
      </div>
      <ToastContainer />
    </>
  );
}
