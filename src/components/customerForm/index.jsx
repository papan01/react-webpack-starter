/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CustomerForm = ({ firstName, lastName, phoneNumber, onSubmit }) => {
  const [customer, setCustomer] = useState({
    firstName,
    lastName,
    phoneNumber,
  });
  const handleChange = ({ target }) => setCustomer(obj => ({ ...obj, [target.name]: target.value }));
  return (
    <form id="customer" onSubmit={() => onSubmit(customer)}>
      <label htmlFor="firstName">First name</label>
      <input id="firstName" type="text" name="firstName" value={firstName} onChange={handleChange} />
      <label htmlFor="lastName">Last name</label>
      <input id="lastName" type="text" name="lastName" value={lastName} onChange={handleChange} />
      <label htmlFor="phoneNumber">Phone number</label>
      <input id="phoneNumber" type="text" name="phoneNumber" value={phoneNumber} onChange={handleChange} />
      <input type="submit" value="Add" />
    </form>
  );
};

CustomerForm.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  phoneNumber: PropTypes.string,
  onSubmit: PropTypes.func,
};

CustomerForm.defaultProps = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  onSubmit: () => {},
};

export default CustomerForm;
