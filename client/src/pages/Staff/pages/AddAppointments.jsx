import React from "react";
import { useState, } from "react";
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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import scheduleService from "../../../features/schedule/scheduleServices";
import dentistService from "../../../features/dentist/dentistServices";
import { makeAppointment } from "../../../features/appointment/appointmentSlice";
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

  const dispatch = useDispatch();
  const error = useSelector((state) => state.appointment.error);
  const { user } = useSelector((state) => state.auth);

  const [add, isAdd] = useState(false);
  const [field, setField] = useState(false);
  const [data, setData] = useState({
    phone: "",
    name: "",
    gender: "Male",
    birthday: "",
    address: "",
    dentistId: 1,
    date: "",
    start: "",
    value: [],
  });
  useEffect(() => {
    setField(
      data.name.length > 0 &&
        data.name.length < 51 &&
        data.birthday.length != 0 &&
        data.phone.length > 0 &&
        data.phone.length < 12 &&
        data.address.length > 0 &&
        data.address.length < 51 &&
        data.date.length != 0 &&
        data.start.length != 0
    );
  }, [
    data.name,
    data.birthday,
    data.address,
    data.phone,
    data.date,
    data.start,
  ]);
  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  const handleListItemAdd = () => {
    isAdd(true);
    const pushData = {
      phone: data.phone,
      name: data.name,
      gender: data.gender,
      birthday: data.birthday,
      address: data.address,
      dentistId: data.dentistId,
      staffId: user?.id,
      startTime: `${data.date} ${data.start}.000`,
    };
    console.log("pushData", pushData);
    console.log("field", field);
    if (field) {
      dispatch(makeAppointment(pushData));
      console.log("message", error);
    }
  };
  const handleInputChange = (name, value) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      {dentist && dentist.length != 0 && (
        <div className="w-[500px] p-10">
          <h1 className=" text-center text-2xl font-semibold pb-10">
            ADD APPOINTMENT
          </h1>
          <div className="flex items-center grow">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">
                Patient
              </label>
            </div>
            <input
              type="text"
              value={data.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={` w-3/4  px-3 py-2 rounded-md  border border-gray-300	`}
            ></input>
          </div>
          {add && (data.name.length === 0 || data.name.length > 50) && (
            <>
              <h1 className="ml-[105px] text-xs text-red-600">
                Patient name should have 1-50 characters
              </h1>
            </>
          )}
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
                <label className="font-mono rounded-md text-center	">
                  Gender
                </label>
              </div>
              <select
                className={`ml-1 w-2/3  px-3 py-2 rounded-md  border border-gray-300	`}
                defaultValue={"Male"}
                onChange={(e) => handleInputChange("gender", e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          {add && data.birthday.length == 0 && (
            <>
              <h1 className="ml-[105px] text-xs text-red-600">
                Birthday required
              </h1>
            </>
          )}
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
          {add && (data.phone.length == 0 || data.phone.length > 11) && (
            <>
              <h1 className="ml-[105px] text-xs text-red-600">
                Phone should have 11 number including country code
              </h1>
            </>
          )}
          <div className="flex items-center grow mt-3">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">
                Address
              </label>
            </div>
            <input
              type="text"
              value={data.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className={` w-3/4  px-3 py-2 rounded-md border border-gray-300	`}
            ></input>
          </div>
          {add && (data.address.length === 0 || data.address.length > 50) && (
            <>
              <h1 className="ml-[105px] text-xs text-red-600">
                Patient address should have 1-120 characters
              </h1>
            </>
          )}
          <div className="flex items-center grow mt-3">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">
                Dentist
              </label>
            </div>
            <select
              value={data.dentistId}
              defaultValue={1}
              onChange={(e) => handleInputChange("dentistId", e.target.value)}
              className="w-3/4 px-3 py-2 rounded-md border border-gray-300 "
            >
              {dentist.length != 0 &&
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
                className={` w-3/4 ml-[60px] px-3 py-2 rounded-md border border-gray-300	`}
              ></input>
            </div>
            <div className="flex w-2/5 items-center ml-3">
              <div className="w-1/4">
                <label className="font-mono rounded-md text-center	">
                  Start
                </label>
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
          <div className="flex">
            {add && data.date.length === 0 && (
              <>
                <h1 className="ml-[105px] text-xs text-red-600">
                  Date required
                </h1>
              </>
            )}
            {add && data.start.length === 0 && (
              <>
                <h1 className="ml-[132px] text-xs text-red-600">
                  Time required
                </h1>
              </>
            )}
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
      )}
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  dentist: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string,
    })
  ).isRequired,
};

const DENTIST_NULL = [
  {
    id: 2,
    text: "dentist",
  },
];

function AddAppointments() {
  let { error, loading, success } = useSelector((state) => state.dentist);
  const [scheduleData, setScheduleData] = useState([]);
  const [dentistData, setDentistData] = useState([]);
  const [state, setState] = useState({
    open: false,
    data: scheduleData,
    currentDate: getDate(),
    resources: [
      {
        fieldName: "dentistId",
        title: "Dentist",
        instances: dentistData.length > 0 ? dentistData : DENTIST_NULL,
      },
    ],
    grouping: [
      {
        resourceName: "dentistId",
      },
    ],
    selectedMember:
      dentistData && dentistData.length > 0 ? dentistData[0].id : 0,
  });

  useEffect(()=>{
    console.log("schdeule",scheduleData);
  },[scheduleData])

  const fetchata = async () => {
    try {
      const [dentistResponse, scheduleResponse] = await Promise.all([
        dentistService.getAllDentist(),
        scheduleService.getAllScheduleAvailable(),
      ]);
      const schedules =
        scheduleResponse?.map((item, index) => ({
          id: index + 1,
          dentistId: item.dentistId,
          title: "free schedule",
          endDate: new Date(item.endTime).toLocaleString("en-US", {
            timeZone: "UTC",
          }),
          startDate: new Date(item.startTime).toLocaleString("en-US", {
            timeZone: "UTC",
          }),
        })) || [];
      const dentists =
        dentistResponse?.map((item) => ({
          id: item.id,
          text: item.name,
        })) || [];
      setScheduleData(schedules);
      setDentistData(dentists);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchata();
  }, [error, loading, success]);
  console.log("schedule data", scheduleData);
  const dentistnull = [
    {
      id: 2,
      text: "dentist",
    },
  ];

  useEffect(() => {
    if (dentistData && dentistData.length != 0) {
      setState((prevState) => {
        // Check if the instances array has changed
        const instancesChanged =
          prevState.resources[0]?.instances != dentistData;

        // Only update if the instances array has changed
        if (instancesChanged) {
          return {
            ...prevState,
            resources: [
              {
                ...prevState.resources[0],
                instances: dentistData,
              },
            ],
          };
        }

        return prevState;
      });
    }
  }, [dentistData]);

  useEffect(() => {
    if (scheduleData && scheduleData.length != 0) {
      setState((prevState) => {
        return { ...prevState, data: scheduleData };
      });
    }
  }, [scheduleData]);

  const handleMemberChange = (event) => {
    const selectedMember = event.target.value || 0;

    const selectedOwner = dentistData
      ? dentistData.find((owner) => owner.id === selectedMember)
      : DENTIST_NULL;

    const membersResource = {
      fieldName: "dentistId",
      title: "Dentist",
      instances: selectedOwner ? [selectedOwner] : dentistData,
    };

    setState((prevState) => ({
      ...prevState,
      selectedMember,
      resources: [
        ...prevState.resources.filter(
          (resource) => resource.fieldName != "dentistId"
        ),
        membersResource,
      ],
      selectedOwner,
      data: selectedMember
        ? scheduleData.filter(
            (schedule) => schedule.dentistId == selectedMember
          )
        : scheduleData,
    }));
  };

  return (
    <div>
      {dentistData && dentistData.length != 0 && (
        <>
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
                {dentistData &&
                  dentistData.map((member) => (
                    <MenuItem key={member.id} value={member.id}>
                      {member?.text}
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
              dentist={dentistData.length > 0 ? dentistData : DENTIST_NULL}
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
        </>
      )}
    </div>
  );
}

export default AddAppointments;
