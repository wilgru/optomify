import { Dayjs } from "dayjs";
import { PatientT } from "../../patients/types/Patient.type";

export type BookingT = {
  id: string;
  created: Date;
  createdBy: string;
  bookingTime: Dayjs;
  durationMins: number;
  type: BookingTypeT;
  status: BookingStatusT | null;
  reason: BookingReasonT | null;
  note: string;
  hasPassed: string;
  patient: PatientT;
};

export type BookingTypeT = "patient" | "break" | "blocked";

export type BookingStatusT = "booked" | "confirmed" | "arrived" | "absent";

export type BookingReasonT =
  | "general"
  | "health concern"
  | "rms"
  | "recheck"
  | "other";
