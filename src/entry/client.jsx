import React from 'react';
import { render } from 'react-dom';
import { sampleAvailableTimeSlots } from './sampleData';
import AppointmentForm from '../components/appointmentForm';
import 'whatwg-fetch';
import './style.css';

render(<AppointmentForm availableTimeSlots={sampleAvailableTimeSlots} />, document.getElementById('app'));
