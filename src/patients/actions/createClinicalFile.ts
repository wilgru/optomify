import { createServerFn } from "@tanstack/react-start";
import dbConnect from "../../lib/dbConnect";
import { ClinicalFile } from "../models/ClinicalFile";
import { ClinicalFileT } from "../types/ClinicalFile.type";
import type { HydratedDocument } from "mongoose";

export const createClinicalFile = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      patientId: string;
      file: Omit<ClinicalFileT, "id" | "dateCreated">;
    }) => data,
  )
  .handler(async ({ data }) => {
    await dbConnect();

    const clinicalFile = new ClinicalFile({
      ...data.file,
      patient: data.patientId,
      dateCreated: new Date(),
    });

    await clinicalFile.save();

    return { clinicalFile };
  });
