import Patient from "../models/Patient";
import { PatientT } from "../types/Patient.type";
import { HydratedDocument } from "mongoose";

export const getPatient = async (
  id: string
): Promise<HydratedDocument<PatientT>> => {
  const patient = await Patient.findById(id);

  if (!patient) {
    throw new Error("No patient was found with this id");
  }

  return patient;
};
