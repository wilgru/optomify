const { Schema } = require('mongoose');

const prescriptionSet = new Schema({
    sphere: {
        type: Number     
    },
    cylinder: {
        type: Number
    },
    axis: {
        type: Number
    }
});

const prescriptionSchema = new Schema({
    right_od: prescriptionSet,
    left_os: prescriptionSet,
    inter_add: {
        type: Number
    },
    near_add: {
        type: Number
    }
});
  
module.exports = prescriptionSchema;