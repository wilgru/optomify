module.exports = {
    validateClinicalFileType: {
        function (value) { return ["Prescription", "Clinical Note", "Report"].includes(value) },
        message: "File type invalid"
    },
    validateDioptres: {
        function (value) { return value % 0.25 === 0},
        message: "Value must be measured in dioptres (units of 0.25)"
    },
    validateCylinder: { 
        funnction(value) {return  value <= 0},
        message: "Value must be a negative number"
    },
    validateAxisDegree: {
        function(value) { return value >= 0 && value <= 180 },
        message: "Value must fall within 0 - 180 degrees"
    },
    validateEmail: {
        function(value) {},
        message: ""
    },
    validateMobile: {
        function(value) {},
        message: ""
    },
    validateMedicare: {
        function(value) {},
        message: ""
    }
}