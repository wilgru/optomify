const { Schema, model } = require('mongoose');

const note = new Schema({
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
  created_by: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }
});

const Note = model('Note', note);

module.exports = Note;