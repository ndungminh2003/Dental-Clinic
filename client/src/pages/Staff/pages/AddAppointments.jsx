import React from "react";
import { useState } from "react";
import {
  ViewState,
  GroupingState,
  IntegratedGrouping,
} from "@devexpress/dx-react-scheduler";
import PropTypes from "prop-types";
import { TextField, Autocomplete } from "@mui/material";
import PhoneInput from "react-phone-input-2";

import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
  AppointmentTooltip,
  Resources,
  GroupingPanel,
} from "@devexpress/dx-react-scheduler-material-ui";
import { AppointmentsData } from "../components/CalendarData/AppointmentsData";
import { owners } from "../components/CalendarData/Task";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllScheduleAvailable } from "../../../features/schedule/scheduleSlice";
import { getAllDentist } from "../../../features/dentist/dentistSlice";

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}
function getDateforinput() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();

  // Pad month and date with leading zeros if needed
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDate = date < 10 ? `0${date}` : date;

  return `${year}-${formattedMonth}-${formattedDate}`;
}
function SimpleDialog(props) {
  const { onClose, open, dentist } = props;
  const [data, setData] = useState({
    phone: "",
    name: "",
    gender: "",
    birthday: "",
    address: "",
    dentist: "",
    staffId: "",
    date: "",
    start: "",
    value: [],
  });
  const handleClose = () => {
    onClose();
  };
  const [openInvoice, setOpenInvoice] = React.useState(false);
  const handleCloseInvoice = () => {
    setOpenInvoice(false);
  };
  const handleListItemClick = (value) => {
    onClose(value);
  };
  const handleListItemAdd = (value) => {
    const pushData = {
      phone: data.phone,
      name: data.name,
      gender: data.gender,
      birthday: data.birthday,
      address: data.address,
    };
    console.log(data);
    // onClose(value);
  };
  const handleInputChange = (name, value) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="w-[500px] p-10">
        <h1 className=" text-center text-2xl font-semibold pb-10">
          ADD APPOINTMENT
        </h1>
        <div className="flex items-center grow">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Patient</label>
          </div>
          <input
            type="text"
            value={data.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={` w-3/4  px-3 py-2 rounded-md  border border-gray-300	`}
          ></input>
        </div>
        <div className="flex  grow mt-3">
          <div className="flex w-[250px] items-center">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">
                Birthday
              </label>
            </div>
            <input
              type="date"
              value={data.birthday}
              onChange={(e) => handleInputChange("birthday", e.target.value)}
              className={` w-3/4 ml-[42px]  px-3 py-2 rounded-md border border-gray-300	`}
            ></input>
          </div>
          <div className="flex items-center ml-2">
            <div className="w-1/3">
              <label className="font-mono rounded-md text-center	">Gender</label>
            </div>
            <select
              className={`ml-1 w-2/3  px-3 py-2 rounded-md  border border-gray-300	`}
              onChange={(e) => handleInputChange("gender", e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Phone</label>
          </div>
          <div className="w-3/4">
            <PhoneInput
              onChange={(value) => handleInputChange("phone", value)}
              inputClass="!w-full !h-[45px] !border !border-gray-300 "
              placeholder="Enter phone number"
              country="vn"
              regions={"asia"}
            />
          </div>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Adress</label>
          </div>
          <input
            type="text"
            value={data.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className={` w-3/4  px-3 py-2 rounded-md border border-gray-300	`}
          ></input>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Dentist</label>
          </div>
          <select
            value={data.dentist}
            onChange={(e) => handleInputChange("dentist", e.target.value)}
            className="w-3/4 px-3 py-2 rounded-md border border-gray-300 "
          >
            {dentist &&
              dentist.map((dentist) => (
                <option key={dentist.id} value={dentist.id}>
                  {dentist.text}
                </option>
              ))}
          </select>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="flex w-3/5 items-center">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Day</label>
            </div>
            <input
              defaultValue={getDateforinput()}
              value={data.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              type="date"
              className={` w-3/4 ml-[57px] px-3 py-2 rounded-md border border-gray-300	`}
            ></input>
          </div>
          <div className="flex w-2/5 items-center ml-3">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Start</label>
            </div>
            <input
              value={data.start}
              onChange={(e) => handleInputChange("start", e.target.value)}
              type="time"
              step="1"
              placeholder="Time"
              className={` w-3/4 ml-2  px-3 py-2 rounded-md border border-gray-300	`}
            ></input>
          </div>
        </div>
        <div className="flex mt-5 justify-end">
          <button
            onClick={() => handleListItemClick()}
            className="bg-neutral-300 rounded-md px-3 py-2"
          >
            Close
          </button>
          <button
            onClick={() => handleListItemAdd()}
            className="ml-2 bg-dirty-blue text-white rounded-md px-3 py-2"
          >
            Add
          </button>
        </div>
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  dentist: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

function AddAppointments() {
  const dispatch = useDispatch();
  const {
    schedule: scheduleData,
    loading: scheduleLoading,
    success: scheduleSuccess,
    error: scheduleError,
  } = useSelector((state) => state.schedule);

  const {
    dentist: dentistData,
    loading: dentistLoading,
    success: dentistSuccess,
    error: dentistError,
  } = useSelector((state) => state.dentist);
  useEffect(() => {
    dispatch(getAllDentist());
    dispatch(getAllScheduleAvailable());
  }, []);
  let currentId = 1;
  const schedule =
    scheduleData &&
    scheduleData.map((item) => ({
      id: currentId++,
      dentistId: item.dentistId,
      title: "free schedule",
      endDate: new Date(item.endTime).toLocaleString("en-US", {
        timeZone: "UTC",
      }), 
      startDate: new Date(item.startTime).toLocaleString("en-US", {
        timeZone: "UTC",
      }), 
    }));

  const dentist =
    dentistData &&
    dentistData.map((item) => ({
      id: item.id,
      text: item.name,
    }));
  useEffect(() => {
    console.log(dentist);
  }, [dentist]);

  const [state, setState] = useState({
    open: false,
    data: schedule,
    currentDate: getDate(),
    resources: [
      {
        fieldName: "dentistId",
        title: "Dentist",
        instances: dentist,
      },
    ],
    grouping: [
      {
        resourceName: "dentistId",
      },
    ],
    selectedMember: null,
  });

  const handleMemberChange = (event) => {
    console.log("Event:", event);
    const selectedMember = event.target.value;
    console.log("Selected Member:", selectedMember);

    const selectedOwner = dentist.find((owner) => owner.id === selectedMember);

    const membersResource = {
      fieldName: "dentistId",
      title: "Dentist",
      instances: selectedOwner ? [selectedOwner] : dentist,
    };

    setState((prevState) => ({
      ...prevState,
      selectedMember,
      resources: [
        ...prevState.resources.filter(
          (resource) => resource.fieldName !== "dentistId"
        ),
        membersResource,
      ],
      selectedOwner,
      data: selectedMember
        ? AppointmentsData.filter((appointment) =>
            appointment.dentistId.includes(selectedMember)
          )
        : AppointmentsData,
    }));
  };

  return (
    <div>
      <div className="w-full flex">
        <div className="flex w-1/3">
          <label className=" flex items-center w-1/3 justify-center">
            Select Doctor
          </label>
          <Select
            className="w-2/3"
            value={state.selectedMember}
            onChange={handleMemberChange}
            inputProps={{
              name: "member",
              id: "member-select",
            }}
          >
            <MenuItem value={0}>All Members</MenuItem>
            {dentist &&
              dentist.map((member) => (
                <MenuItem key={member.id} value={member.id}>
                  {member.text}
                </MenuItem>
              ))}
          </Select>
        </div>
        <div className="ml-5 w-1/3">
          <button
            onClick={() =>
              setState((prevState) => ({ ...prevState, open: true }))
            }
            className="p-4 border rounded-md bg-dirty-blue text-white"
          >
            Add appointment
          </button>
        </div>
        <SimpleDialog
          open={state.open}
          dentist={dentist}
          onClose={() =>
            setState((prevState) => ({ ...prevState, open: false }))
          }
        />
      </div>
      <div
        style={{
          height: "calc(100vh - 150px)",
          width: "80vw",
          overflowX: "auto",
        }}
      >
        <Scheduler data={state.data} height="auto">
          <ViewState
            defaultCurrentDate={state.currentDate}
            defaultCurrentViewName="Week"
            timeScale={{ startDayHour: 7, endDayHour: 18 }}
          />
          <GroupingState grouping={state.grouping} />
          <DayView startDayHour={7} endDayHour={18} />
          <WeekView startDayHour={7} endDayHour={18} />

          <Toolbar />
          <ViewSwitcher />
          <DateNavigator />
          <TodayButton />
          <Appointments />
          <Resources data={state.resources} mainResourceName="dentistId" />
          <IntegratedGrouping />
          <AppointmentTooltip />
          <GroupingPanel />
        </Scheduler>
      </div>
    </div>
  );
}

export default AddAppointments;
