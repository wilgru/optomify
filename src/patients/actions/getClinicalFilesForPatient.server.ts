import { createServerFn } from "@tanstack/react-start";
import dbConnect from "../../lib/dbConnect.server";
import { ClinicalFile } from "../models/ClinicalFile";
import { ClinicalFileT } from "../types/ClinicalFile.type";

export const getClinicalFilesForPatient = createServerFn()
  .inputValidator((patientId: string) => patientId)
  .handler(async ({ data: patientId }): Promise<ClinicalFileT[]> => {
    await dbConnect();

    const clinicalFiles = await ClinicalFile.find({
      patient: patientId,
    }).populate("patient");

    return clinicalFiles.map((f) => f.toObject()) as ClinicalFileT[];
  });
