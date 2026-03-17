import { Dayjs } from "dayjs";
import { PatientT } from "./Patient.type";

export type PrescriptionSetT = {
  sphere: number;
  cylinder: number;
  axis: number;
};

export type PrescriptionT = {
  rightOd: PrescriptionSetT;
  leftOs: PrescriptionSetT;
  interAdd: number;
  nearAdd: number;
};

export type ClinicalFileT = {
  id: string;
  fileType: "prescription" | "health check" | "report";
  title: string;
  textField: string;
  medicareItemCode: string;
  recall: Dayjs;
  dateCreated: Dayjs;
  // createdBy: string;
  patient: PatientT;
  prevPrescription: PrescriptionT;
  givenPrescription: PrescriptionT;
};
