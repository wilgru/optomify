import { ClinicalFile } from "../../../models/ClinicalFile";
import { ClinicalFileT } from "../../../types/ClinicalFile.type";
import { HydratedDocument } from "mongoose";

export const createClinicalFile = async (
  clinicalFileData: Omit<ClinicalFileT, "patient" | "id" | "dateCreated">,
  patientId: string
): Promise<HydratedDocument<ClinicalFileT>> => {
  const clinicalFile = new ClinicalFile({
    fileType: clinicalFileData.fileType,
    title: clinicalFileData.title,
    textField: clinicalFileData.textField,
    medicareItemCode: clinicalFileData.medicareItemCode,
    recall: clinicalFileData.recall,
    patient: patientId,
    prevPrescription: clinicalFileData.prevPrescription,
    givenPrescription: clinicalFileData.givenPrescription,
  });
  await clinicalFile.save();

  return clinicalFile;
};
