import { createServerFn } from "@tanstack/react-start";
import dbConnect from "../../lib/dbConnect";
import Patient from "../models/Patient";
import { PatientT } from "../types/Patient.type";

export const getPatients = createServerFn()
  .handler(async (): Promise<PatientT[]> => {
    await dbConnect();

    const patients = await Patient.find({});

    if (!patients) {
      throw new Error("No patients were found.");
    }

    return patients.map((p) => p.toObject()) as PatientT[];
  });
