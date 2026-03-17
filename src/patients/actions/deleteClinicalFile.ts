import { createServerFn } from "@tanstack/react-start";
import dbConnect from "../../lib/dbConnect";
import { ClinicalFile } from "../models/ClinicalFile";

export const deleteClinicalFile = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await dbConnect();

    const clinicalFile = await ClinicalFile.findByIdAndDelete(data.id);

    if (!clinicalFile) {
      throw new Error("Clinical file not found");
    }

    return { success: true };
  });
