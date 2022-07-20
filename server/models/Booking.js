const { Schema, model } = require('mongoose');
const Patient = require('./Patient');

const bookingSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  booking_start: {
    type: Date,
    required: true,
  },
  booking_end: {
    type: Date,
    required: true,
  },
  patient: Patient,
  booking_note: {
    type: String
  },
  booking_type: {
    type: String,
    required: true,
  }
});

const Booking = model('Booking', bookingSchema);

module.exports = Booking;