// const BookSetup = require('../models/BookSetup');

module.exports = {
    validateClinicalFileType: {
        validator: function (value) { return ["prescription", "health check", "report"].includes(value) },
        message: props => `${props.value} File type invalid`
    },
    validateBookingStatus: {
        validator: function (value) { return ["booked", "confirmed", "arrived", "absent", "cancelled"].includes(value) },
        message: props => `'${props.value}' is an invalid booking status` 
    },
    validateBookingType: {
        validator: function (value) { return ["general eye test", "health concern", "rms form", "re-check", "other", "blocked"].includes(value) },
        message: props => `'${props.value}' is an invalid booking type` 
    },
    validate30MinBlock: {
        validator: function (value) { return value.getMinutes() % 30 === 0 },
        message: "not in a 30 min block"
    },
    validateBookSettedUp: {
        validator: async function (value) {
            const BookSetup = require('../models/BookSetup')
            const found = await BookSetup.exists({
                $and: [
                    { $expr: {$eq: [{$dayOfMonth: "$date"}, value.getDate()]} },
                    { $expr: {$eq: [{$month: "$date"}, value.getMonth() + 1]} },
                    { $expr: {$eq: [{$year: "$date"}, value.getFullYear()]} }
                ]
            })
        
            return found != null
        },
        message: "Cant book for a day that doesnt exist"
    },
    validateDioptres: {
        validator: function (value) { return value % 0.25 === 0 },
        message: "Value must be measured in dioptres (units of 0.25)"
    },
    validateCylinder: { 
        validator: function(value) { return  value <= 0 },
        message: "Value must be a negative number"
    },
    validateAxisDegree: {
        validator: function(value) { return value >= 0 && value <= 180 },
        message: "Value must fall within 0 - 180 degrees"
    },
    validateEmail: {
        validator: function(value) {},
        message: ""
    },
    validateMobile: {
        validator: function(value) {},
        message: ""
    },
    validateMedicare: {
        validator: function(value) {},
        message: ""
    }
}