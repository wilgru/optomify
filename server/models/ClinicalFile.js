const { Schema, model } = require('mongoose');

["precription", "health check", "report"];

const clinicalFile = new Schema({
    file_type: {
      type: String,
      required: true
    },
    patient: {

    },
    date_created: {
      type: Date,
      required: true
    },
    text_field: {
      type: String,
      required: true
    },
    medicare_item: {
      type: String,
      required: true
    },
    recall: {
      type: Date
    },
    prev_prescription: { // use prescriptionSchema
      required: true
    },
    given_prescription: { // use prescriptionSchema
      required: true
    },
  });
  
  const ClinicalFile = model('ClinicalFile', clinicalFile);
  
  module.exports = ClinicalFile;