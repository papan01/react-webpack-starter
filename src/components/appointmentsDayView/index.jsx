import React, { useState } from 'react';
import PropTypes from 'prop-types';

const appointmentTimeOfDay = startsAt => {
  const [h, m] = new Date(startsAt).toTimeString().split(':');
  return `${h}:${m}`;
};

export const Appointment = ({ customer, service, stylist, notes, startsAt }) => {
  return (
    <div id="appointmentView">
      <h3>
        Today&rsquo;s appointment at
        {appointmentTimeOfDay(startsAt)}
      </h3>
      <table>
        <tbody>
          <tr>
            <td>Customer</td>
            <td>
              {customer.firstName}
              {customer.lastName}
            </td>
          </tr>
          <tr>
            <td>Phone number</td>
            <td>{customer.phoneNumber}</td>
          </tr>
          <tr>
            <td>Stylist</td>
            <td>{stylist}</td>
          </tr>
          <tr>
            <td>Service</td>
            <td>{service}</td>
          </tr>
          <tr>
            <td>Notes</td>
            <td>{notes}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Appointment.propTypes = {
  customer: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
  stylist: PropTypes.string,
  service: PropTypes.string,
  notes: PropTypes.string,
  startsAt: PropTypes.string,
};

Appointment.defaultProps = {
  customer: { firstName: '', lastName: '', phoneNumber: '' },
  stylist: '',
  service: '',
  notes: '',
  startsAt: '',
};

const AppointmentsDayView = ({ appointments }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(0);
  return (
    <div id="appointmentsDayView">
      <ol>
        {appointments.map((appointment, index) => (
          <li key={appointment.startsAt}>
            <button
              type="button"
              onClick={() => setSelectedAppointment(index)}
              className={index === selectedAppointment ? 'toggled' : ''}
            >
              {appointmentTimeOfDay(appointment.startsAt)}
            </button>
          </li>
        ))}
      </ol>
      {appointments.length === 0 ? (
        <p>There are no appointments scheduled for today</p>
      ) : (
        <Appointment
          customer={appointments[selectedAppointment].customer}
          startsAt={appointments[selectedAppointment].startAt}
        />
      )}
    </div>
  );
};

AppointmentsDayView.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      startAt: PropTypes.string,
      customer: PropTypes.shape({
        firstName: PropTypes.string,
      }),
    }),
  ).isRequired,
};

export default AppointmentsDayView;
