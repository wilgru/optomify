import { ClinicalFile } from "../../../models/ClinicalFile";
import { ClinicalFileT } from "../../../types/ClinicalFile.type";
import { HydratedDocument } from "mongoose";

export const getClinicalFilesForPatient = async (
  patientId: string
): Promise<HydratedDocument<ClinicalFileT>[]> => {
  const clinicalFiles = await ClinicalFile.find({
    $where: function () {
      return this.equals("id", patientId);
    },
  });

  return clinicalFiles;
};
