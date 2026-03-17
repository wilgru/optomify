import { createServerFn } from "@tanstack/react-start";
import dbConnect from "../../lib/dbConnect";
import Booking from "../models/Booking";
import { BookingStatusT } from "../types/Booking.type";
import type { HydratedDocument } from "mongoose";
import { BookingT } from "../types/Booking.type";

export const updateBookingStatus = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; status: BookingStatusT }) => data)
  .handler(async ({ data }) => {
    await dbConnect();

    const booking = (await Booking.findByIdAndUpdate(
      data.id,
      { status: data.status },
      { new: true },
    )) as HydratedDocument<BookingT>;

    if (!booking) {
      throw new Error("Booking not found");
    }

    return { booking };
  });
