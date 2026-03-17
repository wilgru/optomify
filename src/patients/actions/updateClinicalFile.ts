import { createServerFn } from "@tanstack/react-start";
import dbConnect from "../../lib/dbConnect";
import { ClinicalFile } from "../models/ClinicalFile";
import { ClinicalFileT } from "../types/ClinicalFile.type";
import type { HydratedDocument } from "mongoose";

export const updateClinicalFile = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      id: string;
      updates: Partial<Omit<ClinicalFileT, "id" | "patient" | "dateCreated">>;
    }) => data,
  )
  .handler(async ({ data }) => {
    await dbConnect();

    const clinicalFile = (await ClinicalFile.findByIdAndUpdate(
      data.id,
      data.updates,
      { new: true },
    )) as HydratedDocument<ClinicalFileT>;

    if (!clinicalFile) {
      throw new Error("Clinical file not found");
    }

    return { clinicalFile };
  });
