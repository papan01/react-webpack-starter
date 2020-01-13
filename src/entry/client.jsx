import React from 'react';
import { render } from 'react-dom';
import AppointmentsDayView from '../components/appointmentsDayView';
import sampleAppointments from './sampleData';
import './style.css';

render(
  <AppointmentsDayView appointments={sampleAppointments} />,
  document.getElementById('app'),
);
