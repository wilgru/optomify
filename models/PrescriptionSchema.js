const { Schema } = require('mongoose');
const { validateAxisDegree, validateCylinder, validateDioptres } = require('../utils/Validators');

const prescriptionSet = new Schema({
    sphere: {
        type: Number,
        validate: validateDioptres   
    },
    cylinder: {
        type: Number,
        validate: [
            validateDioptres,
            validateCylinder
        ]
    },
    axis: {
        type: Number,
        required: function() {return !!this.cylinder},
        validate: validateAxisDegree
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