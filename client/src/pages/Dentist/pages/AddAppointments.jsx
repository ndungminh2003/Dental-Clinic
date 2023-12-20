import * as React from "react";
import Paper from "@mui/material/Paper";
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
import { appointments } from "../components/CalendarData/data";
const Demo = () => {
  const [state, setState] = useState({
    data: appointments,
    currentDate: '2018-06-27',
    addedAppointment: {},
    appointmentChanges: {},
    editingAppointment: undefined,
  });

  const changeAddedAppointment = (addedAppointment) => {
    const defaultTitle = addedAppointment.title || 'Schedule';
    const updatedAppointment = {
      ...addedAppointment,
      title: defaultTitle,
    };
    setState((prevState) => ({ ...prevState, addedAppointment: updatedAppointment }));
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
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
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
    <div style={{ height: 'calc(100vh - 80px)', width: '80vw', overflowX: 'auto' }}>
      <Scheduler data={data} height="auto">
        <ViewState defaultCurrentDate={currentDate} defaultCurrentViewName="Week" />
        <DayView startDayHour={9} endDayHour={18} />
        <WeekView startDayHour={10} endDayHour={19} />
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
        <Appointments />
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm textEditorComponent={TextEditor} />
      </Scheduler>
    </div>
  );
};

export default Demo;
const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === "titleTextEditor") {
    return <AppointmentForm.TextEditor {...props} disabled={true} value="Schedule" />;
  }
  return <AppointmentForm.TextEditor {...props} />;
};
