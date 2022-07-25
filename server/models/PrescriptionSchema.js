const { Schema } = require('mongoose');

const prescriptionSet = new Schema({
    sphere: {
        type: Number     
    },
    cylinder: {
        type: Number,
        validate: {
            validator: (value) => value <= 0,
            message: "Cylinder must be less then 0"
        }
    },
    axis: {
        type: Number,
        required: () => this.cylinder,
        validate: { 
            validator: (value) => value >= 0 && value <= 180,
            message: "axis must be between 0 - 180"
        }
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