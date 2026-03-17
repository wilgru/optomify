import { createServerFn } from "@tanstack/react-start";
import dbConnect from "../../lib/dbConnect";
import Patient from "../models/Patient";
import { PatientT } from "../types/Patient.type";

export const getPatient = createServerFn()
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }): Promise<PatientT> => {
    await dbConnect();

    const patient = await Patient.findById(id);

    if (!patient) {
      throw new Error("No patient was found with this id");
    }

    return patient.toObject() as PatientT;
  });
