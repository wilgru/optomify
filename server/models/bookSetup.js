const { Schema, model } = require('mongoose');
const Booking = require('./Booking')

const bookSetupSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  open_time: {
    type: Date,
    required: true,
  },
  closing_time: {
    type: Date,
    required: true,
  },
  optom_break_start: {
    type: Date,
    required: true,
  },
  bookings: [Booking]
});

// uses hook to make sure a made booking falls within the 30 min blocks. otherwise return error and do not allow booking to be made

const BookSetup = model('BookSetup', bookSetupSchema);

module.exports = BookSetup;