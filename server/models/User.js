const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  password: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});
  
const User = model('User', userSchema);

module.exports = User;