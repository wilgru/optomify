import { ClinicalFile } from "../../../models/ClinicalFile";
import { ClinicalFileT } from "../../../types/ClinicalFile.type";

export const updateClinicalFile = async (
  clinicalFileData: Omit<ClinicalFileT, "patient" | "dateCreated">
): Promise<void> => {
  const clinicalFile = ClinicalFile.updateOne(
    { id: clinicalFileData.id },
    {
      fileType: clinicalFileData.fileType,
      title: clinicalFileData.title,
      textField: clinicalFileData.textField,
      medicareItemCode: clinicalFileData.medicareItemCode,
      recall: clinicalFileData.recall,
      prevPrescription: clinicalFileData.prevPrescription,
      givenPrescription: clinicalFileData.givenPrescription,
    }
  );

  clinicalFile.updateOne({ _id: clinicalFileData.id }, clinicalFileData);
};
