import React from "react";
import { useState } from "react";
import {
  ViewState,
  GroupingState,
  IntegratedGrouping,
} from "@devexpress/dx-react-scheduler";
import PropTypes from "prop-types";
import { TextField, Autocomplete } from "@mui/material";

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


const service = [
  {
    id: 1,
    price: 50,
    name: "Service1",
    description: "Basic dental checkup",
  },
  {
    id: 2,
    price: 60,
    name: "Service2",
    description: "dental filling service",
  },
  {
    id: 3,
    price: 160,
    name: "Service3",
    description: "dental filling service",
  },
];
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
  const { onClose, open,services } = props;
  let startTime;
  let date;
  const [data, setData] = useState({
    phone: '',
    name: '',
    gender: '',
    birthday: '',
    address: '',
    dentistId: '',
    staffId: '',
    startTime: '',
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleInvoiceClick = () => {
    setOpenInvoice(true);
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
            onChange={handleInputChange}
            className={` w-3/4  px-3 py-2 rounded-md  border border-gray-300	`}
          ></input>
        </div>
        <div className="flex  grow mt-3">
          <div className="flex w-2/3 items-center">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Phone</label>
            </div>
            <input
              type="text"
              value={data.phone}
              onChange={handleInputChange}
              className={` w-3/4 ml-[50px] px-3 py-2 rounded-md border border-gray-300	`}
            ></input>
          </div>
          <div className="flex w-1/3 items-center ml-3">
            <div className="w-1/2">
              <label className="font-mono rounded-md text-center	">Gender</label>
            </div>
            <input
              type="text"
              value={data.gender}
              onChange={handleInputChange}
              className={` w-1/2  px-3 py-2 rounded-md  border border-gray-300	`}
            ></input>
          </div>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Birthday</label>
          </div>
          <input
            type="date"
            value={data.birthday}
            onChange={handleInputChange}
            className={` w-3/4  px-3 py-2 rounded-md border border-gray-300	`}
          ></input>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Adress</label>
          </div>
          <input
            type="text"
            value={data.address}
            onChange={handleInputChange}
            className={` w-3/4  px-3 py-2 rounded-md border border-gray-300	`}
          ></input>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Doctor</label>
          </div>
          <input
            type="text"
            value={"Nguyễn Văn A"}
            disabled="true"
            className={` w-3/4  px-3 py-2 rounded-md border border-gray-300	`}
          ></input>
        </div>
        <div className="flex items-center grow mt-3">
          <div  className="flex w-3/5 items-center">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Day</label>
            </div>
            <input
              defaultValue={getDateforinput()}
              type="date"
              className={` w-3/4 ml-[58px] px-3 py-2 rounded-md border border-gray-300	`}
            ></input>
          </div>
          <div className="flex w-2/5 items-center ml-3">
            <div className="w-1/4">
              <label className="font-mono rounded-md text-center	">Hour</label>
            </div>
            <input
              type="time"
              step="1"
              placeholder="Time"
              className={` w-3/4  px-3 py-2 rounded-md border border-gray-300	`}
            ></input>
          </div>
        </div>
        <div className="flex items-center grow mt-3">
          <div className="w-1/4">
            <label className="font-mono rounded-md text-center	">Service</label>
          </div>
          <Autocomplete
            sx={{ marginLeft: "26px", width: "100%" }}
            multiple
            options={service.map((data) => data.name)}
            getOptionLabel={(option) => option}
            disableCloseOnSelect
            renderInput={(params) => (
              <TextField {...params} variant="outlined" placeholder="Add" />
            )}
          />
        </div>
        <div className ="flex mt-5 justify-end">
          <button
            onClick={() => handleListItemClick()}
            className="bg-neutral-300 rounded-md px-3 py-2"
          >
            Close
          </button>
          <button
            onClick={() => handleListItemClick()}
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
  serviceName: PropTypes.array.isRequired,
};



export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      data: AppointmentsData,
      currentDate: getDate(),
      resources: [
        {
          fieldName: "members",
          title: "Members",
          instances: owners,
        },
      ],
      grouping: [
        {
          resourceName: "members",
        },
      ],
      selectedMember: null, // Newly added state for selected member
    };
    this.handleMemberChange = this.handleMemberChange.bind(this);
  }

  handleMemberChange(event) {
    console.log("Event:", event);
    const selectedMember = event.target.value;
    console.log("Selected Member:", selectedMember);
    // Filter appointments data based on the selected member
    const selectedOwner = owners.find((owner) => owner.id === selectedMember);

    // Update the instances for the "Members" resource
    const membersResource = {
      fieldName: "members",
      title: "Members",
      instances: selectedOwner ? [selectedOwner] : owners,
    };

    // Update the state with the selected member and the new resource instances
    this.setState((prevState) => ({
      selectedMember,
      resources: [
        ...prevState.resources.filter(
          (resource) => resource.fieldName !== "members"
        ),
        membersResource,
      ],
      selectedOwner,
      // Use the original AppointmentsData if no member is selected
      data: selectedMember
        ? AppointmentsData.filter((appointment) =>
            appointment.members.includes(selectedMember)
          )
        : AppointmentsData,
    }));
  }

  render() {
    const { data, currentDate, resources, grouping, selectedMember } =
      this.state;
    return (
      <div>
        <div className="w-full flex">
          <div className="flex w-1/3">
            <label className=" flex items-center w-1/3 justify-center">Select Doctor</label>
            <Select
              className="w-2/3"
              value={selectedMember}
              onChange={this.handleMemberChange}
              inputProps={{
                name: "member",
                id: "member-select",
              }}
            >
              <MenuItem value={0}>All Members</MenuItem>
              {owners.map((member) => (
                <MenuItem key={member.id} value={member.id}>
                  {member.text}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className ="ml-5 w-1/3">
            <button 
              onClick={()=> this.setState({open: true})}
              className ="p-4 border rounded-md bg-dirty-blue text-white">
              Add appointment
            </button>
          </div>
          <SimpleDialog
            open={this.state.open}
            onClose={()=> this.setState({open: false})}
          />
        </div>
        <div
          style={{
            height: "calc(100vh - 150px)",
            width: "80vw",
            overflowX: "auto",
          }}
        >
          <Scheduler data={data} height="auto">
            <ViewState
              defaultCurrentDate={currentDate}
              defaultCurrentViewName="Week"
            />
            <GroupingState grouping={grouping} />
            <DayView startDayHour={9} endDayHour={18} />
            <WeekView startDayHour={10} endDayHour={19} />

            <Toolbar />
            <ViewSwitcher />
            <DateNavigator />
            <TodayButton />
            <Appointments />
            <Resources data={resources} mainResourceName="members" />
            <IntegratedGrouping />
            <AppointmentTooltip showOpenButton showDeleteButton />
            <GroupingPanel />
          </Scheduler>
        </div>
      </div>
    );
  }
}
