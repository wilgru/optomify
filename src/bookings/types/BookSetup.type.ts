import { Dayjs } from "dayjs";
import { BookingT } from "./Booking.type";

export type BookSetupT = {
  id: string;
  date: Dayjs;
  openTime: Dayjs;
  closingTime: Dayjs;
  break: Dayjs;
  bookings: BookingT[];
  isToday: boolean; // TODO: computed property
  timeSlots: TimeSlotT[]; // TODO: computed property
};

export type TimeSlotT = {
  bookSetupId: string;
  time: Dayjs;
  booking: BookingT | null;
};
