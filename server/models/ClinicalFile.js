const { Schema, model } = require('mongoose');
const PrescriptionSchema = require('./PrescriptionSchema');
const { validateClinicalFileType } = require('../utils/Validators');

["precription", "health check", "report"];

const clinicalFileSchema = new Schema({
  file_type: {
    type: String,
    required: true,
    validate: validateClinicalFileType
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
    required: function() {return this.file_type === "prescription" || this.file_type === "clinical note"}
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

const ClinicalFile = model('ClinicalFile', clinicalFileSchema);

module.exports = ClinicalFile;