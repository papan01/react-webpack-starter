/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const timeIncrements = (numTimes, startTime, increment) =>
  Array(numTimes)
    .fill([startTime])
    .reduce((acc, _, i) => acc.concat([startTime + i * increment]));

const dailyTimeSlots = (salonOpensAt, salonClosesAt) => {
  const totalSlots = (salonClosesAt - salonOpensAt) * 2;
  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);
  const increment = 30 * 60 * 1000;
  return timeIncrements(totalSlots, startTime, increment);
};

const toTimeValue = timestamp => new Date(timestamp).toTimeString().substring(0, 5);

const weeklyDateValues = startDate => {
  const midnight = new Date(startDate).setHours(0, 0, 0, 0);
  const increment = 24 * 60 * 60 * 1000;
  return timeIncrements(7, midnight, increment);
};

const toShortDate = timestamp => {
  const [day, , dayofMonth] = new Date(timestamp).toDateString().split(' ');
  return `${day} ${dayofMonth}`;
};

const mergeDateAndTime = (date, timeSlot) => {
  const time = new Date(timeSlot);
  return new Date(date).setHours(time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
};

const RadioButtonIfAvailable = ({ availableTimeSlots, date, timeSlot, checkedTimeSlot, handleChange }) => {
  const startsAt = mergeDateAndTime(date, timeSlot);
  const isChecked = startsAt === checkedTimeSlot;
  if (availableTimeSlots.some(availableTimeSlot => availableTimeSlot.startsAt === startsAt)) {
    return <input name="startsAt" type="radio" value={startsAt} checked={isChecked} onChange={handleChange} />;
  }
  return null;
};

RadioButtonIfAvailable.propTypes = {
  availableTimeSlots: PropTypes.arrayOf(PropTypes.object).isRequired,
  date: PropTypes.number.isRequired,
  timeSlot: PropTypes.number.isRequired,
  checkedTimeSlot: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

const TimeSlotTable = ({ salonOpensAt, salonClosesAt, today, availableTimeSlots, checkedTimeSlot, handleChange }) => {
  const timeSlots = dailyTimeSlots(salonOpensAt, salonClosesAt);
  const dates = weeklyDateValues(today);
  return (
    <table id="time-slots">
      <thead>
        <tr>
          <th />
          {dates.map(date => (
            <th key={date}>{toShortDate(date)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map(timeSlot => (
          <tr key={timeSlot}>
            <th>{toTimeValue(timeSlot)}</th>
            {dates.map(date => (
              <td key={date}>
                <RadioButtonIfAvailable
                  availableTimeSlots={availableTimeSlots}
                  date={date}
                  timeSlot={timeSlot}
                  checkedTimeSlot={checkedTimeSlot}
                  handleChange={handleChange}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TimeSlotTable.propTypes = {
  salonOpensAt: PropTypes.number.isRequired,
  salonClosesAt: PropTypes.number.isRequired,
  today: PropTypes.objectOf(Date).isRequired,
  availableTimeSlots: PropTypes.arrayOf(PropTypes.object).isRequired,
  checkedTimeSlot: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

const AppointmentForm = ({
  selectableServices,
  service,
  onSubmit,
  salonOpensAt,
  salonClosesAt,
  today,
  availableTimeSlots,
  startsAt,
}) => {
  const [appointment, setAppointment] = useState({ service, startsAt });
  const handleServiceChange = ({ target: { value } }) => {
    setAppointment(props => ({
      ...props,
      service: value,
    }));
  };

  const handleStartsAtChange = useCallback(
    ({ target: { value } }) =>
      setAppointment(props => ({
        ...props,
        startsAt: parseInt(value, 10),
      })),
    [],
  );

  return (
    <form id="appointment" onSubmit={() => onSubmit(appointment)}>
      <label htmlFor="service">Salon service</label>
      <select name="service" id="service" value={service} onChange={handleServiceChange}>
        <option />
        {selectableServices.map(s => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <TimeSlotTable
        salonOpensAt={salonOpensAt}
        salonClosesAt={salonClosesAt}
        today={today}
        availableTimeSlots={availableTimeSlots}
        checkedTimeSlot={appointment.startsAt}
        handleChange={handleStartsAtChange}
      />

      <input type="submit" value="Add" />
    </form>
  );
};

AppointmentForm.propTypes = {
  selectableServices: PropTypes.arrayOf(PropTypes.string),
  service: PropTypes.string,
  onSubmit: PropTypes.func,
  salonOpensAt: PropTypes.number,
  salonClosesAt: PropTypes.number,
  today: PropTypes.objectOf(Date),
  availableTimeSlots: PropTypes.arrayOf(PropTypes.object),
  startsAt: PropTypes.number,
};

AppointmentForm.defaultProps = {
  selectableServices: ['Cut', 'Blow-dry', 'Cut & color', 'Beard trim', 'Cut & beard trim', 'Extensions'],
  service: '',
  onSubmit: () => {},
  salonOpensAt: 9,
  salonClosesAt: 19,
  today: new Date(),
  availableTimeSlots: [],
  startsAt: 9,
};

export default AppointmentForm;
