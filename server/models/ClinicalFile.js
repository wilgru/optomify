const { Schema, model } = require('mongoose');
const PrescriptionSchema = require('./PrescriptionSchema');

["precription", "health check", "report"];

const clinicalFile = new Schema({
  file_type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date_created: {
    type: Date,
    required: true,
    default: Date.now()
  },
  text_field: {
    type: String,
    required: true
  },
  medicare_item_code: {
    type: String,
    required: true
  },
  recall: {
    type: Date
  },
  created_by: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  prev_prescription: PrescriptionSchema,
  given_prescription: PrescriptionSchema,
});

const ClinicalFile = model('ClinicalFile', clinicalFile);

module.exports = ClinicalFile;