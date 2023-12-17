import React from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BlockUser from "../components/BlockUser";
import staffService from "../../../features/staff/staffServices";
import customerService from "../../../features/customer/customerServices";
import dentistService from "../../../features/dentist/dentistServices";
import { blockUser } from "../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const mapResponseToRole = (dataArray, role) => {
  return dataArray.map((data) => ({
    id: data.id,
    name: data.name,
    phoneNumber: data.phoneNumber,
    role: role,
    isBlocked: data.isBlocked ? "Blocked" : "Active",
  }));
};

export default function AllUsers() {
  const dispatch = useDispatch();
  let { error, loading, success } = useSelector((state) => state.auth);

  const fetchData = async () => {
    try {
      const [responseCustomer, responseStaff, responseDentist] =
        await Promise.all([
          customerService.getAllCustomer(),
          staffService.getAllStaff(),
          dentistService.getAllDentist(),
        ]);

      const processedCustomer = mapResponseToRole(responseCustomer, "Customer");
      const processedStaff = mapResponseToRole(responseStaff, "Staff");
      const processedDentist = mapResponseToRole(responseDentist, "Dentist");

      const userData = [
        ...processedCustomer,
        ...processedStaff,
        ...processedDentist,
      ];

      setUserData(userData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [error, loading, success]);

  const [userData, setUserData] = React.useState([]);
  const [openBlock, setOpenBlock] = React.useState(false);
  const [status, setStatus] = React.useState("");

  const handleCloseBlock = () => {
    setOpenBlock(false);
  };
  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "phoneNumber",
      label: "Phone number",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "role",
      label: "Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "isBlocked",
      label: "Status",
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
              <button onClick={() => handleActionClickBlock({ dataIndex })}>
                {userData[dataIndex].isBlocked === "Active"
                  ? "Block"
                  : "Un block"}
              </button>
            </div>
          );
        },
      },
    },
  ];

  const handleActionClickBlock = (row) => {
    setOpenBlock(true);
    setStatus(userData[row.dataIndex].isBlocked);
    console.log(userData[row.dataIndex].id);
    const user = {
      id: userData[row.dataIndex].id,
      role: userData[row.dataIndex].role,
    };
    dispatch(blockUser(user));
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
            data={userData}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </div>
      <BlockUser open={openBlock} onClose={handleCloseBlock} status={status} />
    </div>
  );
}
