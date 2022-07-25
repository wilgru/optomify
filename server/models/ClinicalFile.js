const { Schema, model } = require('mongoose');
const PrescriptionSchema = require('./PrescriptionSchema');

["precription", "health check", "report"];

const clinicalFileSchema = new Schema({
  file_type: {
    type: String,
    required: true,
    validate: {
      validator: value => ["prescription", "clinical note", "report"].includes(value),
      message: props => `${props.value} is invalid for slider_value`,
    },
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
    required: () => this.type === "prescription"
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