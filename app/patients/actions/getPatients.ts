import dbConnect from "../../lib/dbConnect";
import Patient from "../models/Patient";
import { PatientT } from "../types/Patient.type";
import { HydratedDocument } from "mongoose";

export const getPatients = async (): Promise<HydratedDocument<PatientT>[]> => {
  await dbConnect();

  const patients = await Patient.find({
    // $or: [
    //   { firstName: { $regex: searchTerm, $options: "i" } },
    //   { lastName: { $regex: searchTerm, $options: "i" } },
    //   { email: { $regex: searchTerm, $options: "i" } },
    // ],
  });

  if (!patients) {
    throw new Error("No patients were found.");
  }

  return patients;
};
