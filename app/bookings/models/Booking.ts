import { Schema, model } from "mongoose";
import { validateBookIsSetUp } from "./validators/validateBookIsSetUp";
import { validateBookingType } from "./validators/validateBookingType";
import { Booking as BookingType } from "../types/Booking.type";
import { validateBookingStatus } from "./validators/validateBookingStatus";
import { Dayjs } from "dayjs";

const bookingSchema = new Schema<BookingType>({
  created: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  bookingTime: {
    type: Dayjs,
    required: true,
    validate: validateBookIsSetUp,
  },
  type: {
    type: String,
    validate: validateBookingType,
    required: true,
  },
  note: {
    type: String,
  },
  status: {
    type: String,
    default: "booked",
    validate: validateBookingStatus,
    required: true,
  },
  patient: {
    type: Schema.Types.ObjectId,
    required: function () {
      return this.type !== "blocked";
    },
    ref: "Patient",
  },
});

export const Booking = model<BookingType>("Booking", bookingSchema);
