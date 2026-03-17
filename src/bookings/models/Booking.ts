import mongoose from "mongoose";
// import { validateBookIsSetUp } from "./validators/validateBookIsSetUp";
// import { validateBookingType } from "./validators/validateBookingType";
import { BookingT } from "../types/Booking.type";
// import { validateBookingStatus } from "./validators/validateBookingStatus";

const { Schema, models } = mongoose;

const bookingSchema = new Schema<BookingT>({
  created: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  bookingTime: {
    type: Date,
    required: true,
    // validate: validateBookIsSetUp,
  },
  type: {
    type: String,
    // validate: validateBookingType,
    required: true,
  },
  note: {
    type: String,
  },
  status: {
    type: String,
    default: "booked",
    // validate: validateBookingStatus,
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

const Booking =
  models.Booking || mongoose.model<BookingT>("Booking", bookingSchema);

export default Booking;
