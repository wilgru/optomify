const { Schema, model } = require('mongoose');
const { validate30MinBlock } = require('../utils/Validators');

const bookSetupSchema = new Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
    validate: validate30MinBlock
  },
  open_time: {
    type: Date,
    required: true,
    validate: validate30MinBlock
  },
  closing_time: {
    type: Date,
    required: true,
    validate: validate30MinBlock
  },
  optom_break_start: {
    type: Date,
    required: true,
    validate: validate30MinBlock
  },
  optom_break_end: {
    type: Date,
    required: true,
    validate: validate30MinBlock
  },
  bookings: [{
    type: Schema.Types.ObjectId, 
    ref: 'Booking'
  }]
});

// uses hook to make sure a made booking falls within the 30 min blocks. otherwise return error and do not allow booking to be made

const BookSetup = model('BookSetup', bookSetupSchema);

module.exports = BookSetup;