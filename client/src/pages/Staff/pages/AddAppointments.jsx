import * as React from 'react';
import { ViewState, EditingState, IntegratedEditing, GroupingState, IntegratedGrouping } from '@devexpress/dx-react-scheduler';
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
  AppointmentForm,
  ConfirmationDialog,
  Resources,
  GroupingPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import { AppointmentsData, type } from '../components/CalendarData/AppointmentsData';
import { owners } from '../components/CalendarData/Task';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === 'multilineTextEditor') {
    return null;
  } return <AppointmentForm.TextEditor {...props} />;
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
    >
      <AppointmentForm.Label
        text="Patient"
        type="title"
      />
      <AppointmentForm.TextEditor
        value={appointmentData.customField}
        onValueChange={onCustomFieldChange}
        placeholder="Patient name"
      />
      <AppointmentForm.Label
        text="Day of birth"
        type="title"
      />
      <AppointmentForm.TextEditor
        value={appointmentData.customField}
        onValueChange={onCustomFieldChange}
        placeholder="Day of birth"
      />
      <AppointmentForm.Label
        text="Adress"
        type="title"
      />
      <AppointmentForm.TextEditor
        value={appointmentData.customField}
        onValueChange={onCustomFieldChange}
        placeholder="Adress"
      />
      <AppointmentForm.Label
        text="Phone"
        type="title"
      />
      <AppointmentForm.TextEditor
        value={appointmentData.customField}
        onValueChange={onCustomFieldChange}
        placeholder="Phone"
      />
      <AppointmentForm.Label
        text="Service"
        type="title"
      />
      <AppointmentForm.TextEditor
        value={appointmentData.customField}
        onValueChange={onCustomFieldChange}
        placeholder="Service"
      />
    </AppointmentForm.BasicLayout>
  );
};

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: AppointmentsData,
      currentDate: '2017-05-28',
      resources: [
        {
          fieldName: 'type',
          title: 'Type',
          instances: type,
        },
        {
          fieldName: 'members',
          title: 'Members',
          instances: owners,
        },
      ],
      grouping: [{
        resourceName: 'members',
      }, {
        resourceName: 'type',
      }],
      addedAppointment: {},
      appointmentChanges: {},
      editingAppointment: undefined,
      selectedMember: null, // Newly added state for selected member
    };
    this.commitChanges = this.commitChanges.bind(this);
    this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
    this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
    this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
    this.handleMemberChange = this.handleMemberChange.bind(this);
  }
  handleMemberChange(event) {
    console.log('Event:', event);
    const selectedMember = event.target.value;
    console.log('Selected Member:', selectedMember);
    // Filter appointments data based on the selected member
    const selectedOwner = owners.find(owner => owner.id === selectedMember);
  
    // Update the instances for the "Members" resource
    const membersResource = {
      fieldName: 'members',
      title: 'Members',
      instances: selectedOwner ? [selectedOwner] : owners,
    };
  
    // Update the state with the selected member and the new resource instances
    this.setState((prevState) => ({
      selectedMember,
      resources: [
        ...prevState.resources.filter(resource => resource.fieldName !== 'members'),
        membersResource,
      ],
      selectedOwner,
      // Use the original AppointmentsData if no member is selected
      data: selectedMember
        ? AppointmentsData.filter(appointment => appointment.members.includes(selectedMember))
        : AppointmentsData,
    }));
  }
  


  changeAddedAppointment(addedAppointment) {
    this.setState({ addedAppointment });
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
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }
  render() {
    const { data, currentDate, resources, grouping, addedAppointment, appointmentChanges, editingAppointment, selectedMember } = this.state;
    return (
      <div >
        <div style={{ display: 'flex', marginBottom: 10 }}>
          {/* Select for choosing members */}
          <FormControl style={{ minWidth: 200, marginRight: 20 }}>
            <div className ="flex w-full">
              <label className ="w-max">Select Doctor</label>
              <Select
                className ="w-full"
                value={selectedMember}
                onChange={this.handleMemberChange}
                inputProps={{
                  name: 'member',
                  id: 'member-select',
                }}
              >
                <MenuItem value={0}>All Members</MenuItem>
                {owners.map(member => (
                  <MenuItem key={member.id} value={member.id}>{member.text}</MenuItem>
                ))}
              </Select>
            </div>
          </FormControl>
        </div>
        <div style={{ height: 'calc(100vh - 150px)',width: '80vw', overflowX: 'auto' }}>
          <Scheduler
            data={data}
            height= "auto"
          >
            <ViewState
              defaultCurrentDate={currentDate}
              defaultCurrentViewName="Week"
            />
            <EditingState
              onCommitChanges={this.commitChanges}
              addedAppointment={addedAppointment}
              onAddedAppointmentChange={this.changeAddedAppointment}
              appointmentChanges={appointmentChanges}
              onAppointmentChangesChange={this.changeAppointmentChanges}
              editingAppointment={editingAppointment}
              onEditingAppointmentChange={this.changeEditingAppointment}
            />
            
            <GroupingState
              grouping={grouping}
            />
            <DayView
              startDayHour={9}
              endDayHour={18}
            />
            <WeekView
              startDayHour={10}
              endDayHour={19}
            />

            <Toolbar />
            <ViewSwitcher />
            <DateNavigator />
            <TodayButton />
            <Appointments />
            <Resources
              data={resources}
              mainResourceName="members"
            />
            <IntegratedGrouping />
            <IntegratedEditing/>
            <ConfirmationDialog
              ignoreCancel
            />

            <AppointmentTooltip
              showOpenButton
              showDeleteButton
            />
            <AppointmentForm
              basicLayoutComponent={BasicLayout}
              textEditorComponent={TextEditor}
            />
            <GroupingPanel />
          </Scheduler>
        </div>
      </div>
    );
  }
}
