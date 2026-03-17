import mongoose from "mongoose";
import {
  ClinicalFileT,
  PrescriptionSetT,
  PrescriptionT,
} from "../types/ClinicalFile.type";

const { Schema } = mongoose;
// import { validateClinicalFileType } from "./Validators/validateClinicalFileType";
// import {
//   validateAxisDegree,
//   validateCylinder,
//   validateDioptres,
// } from "../../utils/Validators";

const prescriptionSet = new Schema<PrescriptionSetT>({
  sphere: {
    type: Number,
    // validate: validateDioptres,
  },
  cylinder: {
    type: Number,
    // validate: [validateDioptres, validateCylinder],
  },
  axis: {
    type: Number,
    // required: function () {
    //   return !!this.cylinder;
    // },
    // validate: validateAxisDegree,
  },
});

const prescriptionSchema = new Schema<PrescriptionT>({
  rightOd: prescriptionSet,
  leftOs: prescriptionSet,
  interAdd: {
    type: Number,
  },
  nearAdd: {
    type: Number,
  },
});

// ["precription", "health check", "report"];

const clinicalFileSchema = new Schema<ClinicalFileT>({
  fileType: {
    type: String,
    required: true,
    // validate: validateClinicalFileType,
  },
  title: {
    type: String,
    required: true,
  },
  textField: {
    type: String,
    required: true,
  },
  medicareItemCode: {
    type: String,
    // required: function () {
    //   return (
    //     this.fileType === "prescription" || this.fileType === "clinical note"
    //   );
    // },
  },
  recall: {
    type: Date,
  },
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
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  prevPrescription: prescriptionSchema,
  givenPrescription: prescriptionSchema,
});

export const ClinicalFile =
  (mongoose.models.ClinicalFile as mongoose.Model<ClinicalFileT>) ||
  mongoose.model<ClinicalFileT>("ClinicalFile", clinicalFileSchema);
