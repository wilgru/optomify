import { Dayjs } from "dayjs";
import { ClinicalFileT } from "./ClinicalFile.type";

export type PatientT = {
  id: string;
  created: Dayjs;
  firstName: string;
  lastName: string;
  dob: Dayjs;
  phone: string;
  email: string;
  medicareNumber: string | null;
  medicareRef: string | null;
  medicareExp: Dayjs | null;
  clinicalFiles: ClinicalFileT[];
  dateCreated: Dayjs;
};
