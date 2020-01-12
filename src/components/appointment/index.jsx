import React from 'react';
import PropTypes from 'prop-types';

export const AppointmentsDayView = ({ appointments }) => {
  const appointmentTimeOfDay = startsAt => {
    const [h, m] = new Date(startsAt).toTimeString().split(':');
    return `${h}:${m}`;
  };
  return (
    <div id="appointmentsDayView">
      <ol>
        {appointments.map(appointment => (
          <li key={appointment.startsAt}>
            {appointmentTimeOfDay(appointment.startsAt)}
          </li>
        ))}
      </ol>
    </div>
  );
};

AppointmentsDayView.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      startAt: PropTypes.string,
    }),
  ).isRequired,
};

const Appointment = ({ customer }) => {
  return <div>{customer.firstName}</div>;
};

Appointment.propTypes = {
  customer: PropTypes.shape({
    firstName: PropTypes.string,
  }).isRequired,
};

export default Appointment;
