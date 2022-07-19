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
    clinical_files: {
    },
    misc_notes: {
    }
  });
  
  const Patient = model('Patient', patient);
  
  module.exports = Patient;