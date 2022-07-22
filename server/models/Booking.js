const { Schema, model } = require('mongoose');

const bookingSchema = new Schema({
  booking_date: {
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
  patient: {
    type: Schema.Types.ObjectId, 
    ref: 'Patient'
  },
  booking_note: {
    type: String
  },
  booking_type: {
    type: String,
    required: true,
  },
  date_created: {
    type: Date,
    required: true,
    default: Date.now()
  },
  created_by: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }
});

const Booking = model('Booking', bookingSchema);

module.exports = Booking;