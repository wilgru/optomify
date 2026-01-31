import { Schema, model, models } from "mongoose";
import { PatientT } from "../types/Patient.type";

const patientSchema = new Schema<PatientT>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  medicareNumber: {
    type: String,
  },
  medicareRef: {
    type: String,
    required: function () {
      return !!this.medicareNumber;
    },
  },
  medicareExp: {
    type: Date,
    required: function () {
      return !!this.medicareNumber;
    },
  },
  // bookings: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Booking",
  //   },
  // ],
  clinicalFiles: [
    {
      type: Schema.Types.ObjectId,
      ref: "ClinicalFile",
    },
  ],
  // notes: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Note",
  //   },
  // ],
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  // createdBy: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
});

const Patient = models.Patient || model("Patient", patientSchema);

export default Patient;
