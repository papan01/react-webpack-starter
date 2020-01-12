import React from 'react';
import PropTypes from 'prop-types';

const Appointment = ({ customer }) => {
  return <div>{customer.firstName}</div>;
};

Appointment.propTypes = {
  customer: PropTypes.shape({
    firstName: PropTypes.string,
  }).isRequired,
};

export default Appointment;
