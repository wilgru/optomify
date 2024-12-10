import { Dayjs } from "dayjs";
import { PatientT } from "../../patients/types/patient.type";

export type Booking = {
  id: string;
  created: Date;
  createdBy: string;
  bookingTime: Dayjs;
  durationMins: number;
  type: BookingType;
  status: BookingStatus | null;
  reason: BookingReason | null;
  note: string;
  hasPassed: string;
  patient: PatientT;
};

export type BookingType = "patient" | "break" | "blocked";

export type BookingStatus = "booked" | "confirmed" | "arrived" | "absent";

export type BookingReason =
  | "general"
  | "health concern"
  | "rms"
  | "recheck"
  | "other";
