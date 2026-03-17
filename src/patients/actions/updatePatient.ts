import { createServerFn } from "@tanstack/react-start";
import dbConnect from "../../lib/dbConnect";
import Patient from "../models/Patient";
import { PatientT } from "../types/Patient.type";
import type { HydratedDocument } from "mongoose";

export const updatePatient = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; updates: Partial<PatientT> }) => data)
  .handler(async ({ data }) => {
    await dbConnect();

    const patient = (await Patient.findByIdAndUpdate(data.id, data.updates, {
      new: true,
    })) as HydratedDocument<PatientT>;

    if (!patient) {
      throw new Error("Patient not found");
    }

    return { patient };
  });
