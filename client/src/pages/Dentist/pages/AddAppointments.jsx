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
import { appointments } from "../components/CalendarData/data";
const date = new Date();
const currentDate = date.toLocaleDateString();
export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      currentDate: currentDate,

      addedAppointment: {},
      appointmentChanges: {},
      editingAppointment: undefined,
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
  }

  changeAddedAppointment(addedAppointment) {
    // Ensure the default title is set to "appointment" for new appointments
    const defaultTitle = addedAppointment.title || "Schedule";
    const updatedAppointment = {
      ...addedAppointment,
      title: defaultTitle,
    };
    this.setState({ addedAppointment: updatedAppointment });
  }

  changeAppointmentChanges(appointmentChanges) {
    this.setState({ appointmentChanges });
  }

  changeEditingAppointment(editingAppointment) {
    this.setState({ editingAppointment });
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const {
      currentDate,
      data,
      addedAppointment,
      appointmentChanges,
      editingAppointment,
    } = this.state;

    return (
      <div
        style={{
          height: "calc(100vh - 80px)",
          width: "80vw",
          overflowX: "auto",
        }}
      >
        <Scheduler data={data} height="auto">
          <ViewState
            defaultCurrentDate={currentDate}
            defaultCurrentViewName="Week"
          />
          <DayView startDayHour={9} endDayHour={18} />
          <WeekView startDayHour={10} endDayHour={19} />
          <MonthView />
          <Toolbar />
          <ViewSwitcher />
          <EditingState
            onCommitChanges={this.commitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={this.changeAddedAppointment}
            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={this.changeAppointmentChanges}
            editingAppointment={editingAppointment}
            onEditingAppointmentChange={this.changeEditingAppointment}
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
  }
}
const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === "titleTextEditor") {
    return <AppointmentForm.TextEditor {...props} value="Schedule" />;
  }
  return <AppointmentForm.TextEditor {...props} />;
};
