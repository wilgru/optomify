const { Schema, model } = require('mongoose');
const PrescriptionSchema = require('./PrescriptionSchema');

const note = new Schema({
  title: {
    type: String,
    required: true
  },
  date_created: {
    type: Date,
    required: true,
    default: () => (Date.now())
  },
  text_field: {
    type: String,
    required: true
  }
});

const Note = model('Note', note);

module.exports = Note;