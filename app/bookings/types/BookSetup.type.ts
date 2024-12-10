import { Dayjs } from "dayjs";
import { Booking } from "./Booking.type";

export type BookSetup = {
  id: string;
  date: Dayjs;
  openTime: Dayjs;
  closingTime: Dayjs;
  break: Dayjs;
  bookings: Booking[];
  isToday: boolean; // TODO: computed property
  timeSlots: TimeSlot[]; // TODO: computed property
};

export type TimeSlot = {
  bookSetupId: string;
  time: Dayjs;
  booking: Booking | null;
};
