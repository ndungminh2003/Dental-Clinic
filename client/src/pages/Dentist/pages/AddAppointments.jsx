import * as React from "react";
import { useEffect } from "react";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  WeekView,
  DayView,
  Toolbar,
  EditRecurrenceMenu,
  ViewSwitcher,
  ConfirmationDialog,
  DateNavigator,
  TodayButton,
  MonthView,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import scheduleService from "../../../features/schedule/scheduleServices";
import PopupSuccess from "../../../components/PopupSuccess";
import PopupFail from "../../../components/PopupFail";
import { deleteDentistSchedule } from "../../../features/schedule/scheduleSlice";
import { createDentistSchedule } from "../../../features/schedule/scheduleSlice";
function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}
function formatDate(inputDateString) {
  const inputDate = new Date(inputDateString);
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");
  const hours = String(inputDate.getHours()).padStart(2, "0");
  const minutes = String(inputDate.getMinutes()).padStart(2, "0");
  const seconds = String(inputDate.getSeconds()).padStart(2, "0");
  const outputDateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.000`;

  return outputDateString;
}
const Demo = () => {
  const dispatch = useDispatch();
  let { error, loading, success, message } = useSelector(
    (state) => state.schedule
  );
  const [schedule, setSchedule] = useState([]);
  const [sucesssD, setSucessD] = useState(false);
  const [fail, setFail] = useState(false);
  const [mess, setMess] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [index, setIndex] = useState(true);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  useEffect(() => {
    fetchData(user.id);
  }, [error, loading, success]);

  useEffect(() => {
    if (!isFirstRender) {
      if (loading !== true) {
        if (success) {
          setSucessD(true);
        } else {
          setFail(true);
          setMess("Temp message");
        }
      }
    }
  }, [loading, success, message]);

  const fetchData = async (dentistId) => {
    try {
      const [dentistResponse, fullSlotResponse] = await Promise.all([
        scheduleService.getDentistSchedule(dentistId),
        scheduleService.getFullslotSchedule(),
      ]);
      let i = 0;
      const dentist = dentistResponse
        .filter((item) => !item.isBooked)
        .map((item, index) => ({
          id: i++,
          title: "free schedule",
          endDate: new Date(item.endTime).toLocaleString("en-US", {
            timeZone: "UTC",
          }),
          startDate: new Date(item.startTime).toLocaleString("en-US", {
            timeZone: "UTC",
          }),
          color: "#80B3EE",
        }));
      setIndex(i);
      const appointment = dentistResponse
        .filter((item) => item.isBooked)
        .map((item, index) => ({
          id: i++,
          title: "appointment",
          endDate: new Date(item.endTime).toLocaleString("en-US", {
            timeZone: "UTC",
          }),
          startDate: new Date(item.startTime).toLocaleString("en-US", {
            timeZone: "UTC",
          }),
          color: "#F59E0B",
        }));
      const fullSlot = fullSlotResponse.map((item, index) => ({
        id: i++,
        title: "full slot schedule",
        endDate: new Date(item.endTime).toLocaleString("en-US", {
          timeZone: "UTC",
        }),
        startDate: new Date(item.startTime).toLocaleString("en-US", {
          timeZone: "UTC",
        }),
        color: "#EE8080",
      }));
      const mergedData = [...dentist, ...fullSlot, ...appointment];
      setSchedule(mergedData);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    setSucessD(false);
    setFail(false);
  };
  const [state, setState] = useState({
    data: schedule,
    currentDate: getDate(),
    addedAppointment: {},
    appointmentChanges: {},
    editingAppointment: undefined,
  });
  const changeAddedAppointment = (addedAppointment) => {
    const defaultTitle = addedAppointment.title || "Schedule";
    const updatedAppointment = {
      ...addedAppointment,
      title: defaultTitle,
    };
    setState((prevState) => ({
      ...prevState,
      addedAppointment: updatedAppointment,
    }));
  };

  const changeAppointmentChanges = (appointmentChanges) => {
    setState((prevState) => ({ ...prevState, appointmentChanges }));
  };

  const changeEditingAppointment = (editingAppointment) => {
    setState((prevState) => ({ ...prevState, editingAppointment }));
  };

  const commitChanges = ({ added, changed, deleted }) => {
    setState((prevState) => {
      let { data } = prevState;
      if (added) {
        let inputData = {
          dentistId: 1,
          startTime: formatDate(added.startDate),
        };
        dispatch(createDentistSchedule(inputData));
        setMess("The schedule has been successfully added.");
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        if (deleted > index - 1) {
          setMess("This isn't schedule and can't be deleted");
          setFail(true);
        } else {
          const rowData = schedule.find((row) => row.id === deleted);
          let inputData = {
            dentistId: 1,
            startTime: rowData.startDate,
          };

          let date = new Date(inputData.startTime);
          date.setUTCHours(date.getUTCHours() + 7);
          let year = date.getUTCFullYear();
          let month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
          let day = ("0" + date.getUTCDate()).slice(-2);
          let hours = ("0" + date.getUTCHours()).slice(-2);
          let minutes = ("0" + date.getUTCMinutes()).slice(-2);
          let seconds = ("0" + date.getUTCSeconds()).slice(-2);
          let date_time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

          inputData.startTime = date_time;

          dispatch(deleteDentistSchedule(inputData));
          setMess("The selected schedule has been successfully deleted.");
        }
      }
      return { ...prevState, data };
    });
  };

  const {
    currentDate,
    data,
    addedAppointment,
    appointmentChanges,
    editingAppointment,
  } = state;

  return (
    <div
      style={{ height: "calc(100vh - 80px)", width: "80vw", overflowX: "auto" }}
    >
      <Scheduler data={schedule} height="auto">
        <ViewState
          defaultCurrentDate={currentDate}
          defaultCurrentViewName="Week"
        />
        <DayView startDayHour={7} endDayHour={18} cellDuration={60} />
        <WeekView startDayHour={7} endDayHour={19} cellDuration={60} />
        <MonthView />
        <Toolbar />
        <ViewSwitcher />
        <EditingState
          onCommitChanges={commitChanges}
          addedAppointment={addedAppointment}
          onAddedAppointmentChange={changeAddedAppointment}
          appointmentChanges={appointmentChanges}
          onAppointmentChangesChange={changeAppointmentChanges}
          editingAppointment={editingAppointment}
          onEditingAppointmentChange={changeEditingAppointment}
        />
        <DateNavigator />
        <TodayButton />
        <EditRecurrenceMenu />
        <ConfirmationDialog />
        <Appointments
          appointmentComponent={(props) => (
            <Appointments.Appointment
              {...props}
              style={{ backgroundColor: props.data.color }}
            />
          )}
        />
        <AppointmentTooltip showDeleteButton />
        <AppointmentForm
          basicLayoutComponent={BasicLayout}
          textEditorComponent={TextEditor}
        />
      </Scheduler>
      <PopupSuccess onClose={handleClose} open={sucesssD} message={mess} />
      <PopupFail onClose={handleClose} open={fail} message={mess} />
    </div>
  );
};

export default Demo;
const TextEditor = (props) => {
  if (props.type === "titleTextEditor") {
    const value = props.value || "Schedule";
    return (
      <AppointmentForm.TextEditor {...props} disabled={true} value={value} />
    );
  }

  if (props.type === "multilineTextEditor") {
    return null;
  }

  return <AppointmentForm.TextEditor {...props} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onCustomFieldChange = (nextValue) => {
    onFieldChange({ customField: nextValue });
  };

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    ></AppointmentForm.BasicLayout>
  );
};
