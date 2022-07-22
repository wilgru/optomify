const { Schema, model } = require('mongoose');

const patient = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  mobile_number: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  has_medicare: {
    type: Boolean,
    required: true
  },
  medicare_number: {
    type: String
  },
  medicare_ref: {
    type: String
  },
  medicare_exp: {
    type: Date
  },
  bookings: [{
    type: Schema.Types.ObjectId, 
    ref: 'Booking'
  }],
  clinical_files: [{
    type: Schema.Types.ObjectId, 
    ref: 'ClinicalFile'
  }],
  notes: [{
    type: Schema.Types.ObjectId, 
    ref: 'Note'
  }],
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
  
const Patient = model('Patient', patient);

module.exports = Patient;