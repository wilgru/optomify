import { createServerFn } from "@tanstack/react-start";
import dbConnect from "../../lib/dbConnect.server";
import BookSetup from "../models/BookSetup";
import { BookSetupT } from "../types/BookSetup.type";

export const getBookSetups = createServerFn()
  .inputValidator(
    (data: { startDate: string | null; endDate: string | null }) => data,
  )
  .handler(async ({ data }): Promise<BookSetupT[]> => {
    await dbConnect();

    const bookSetups = await BookSetup.find({
      date: {
        $gte: data.startDate,
        $lte: data.endDate,
      },
    }).populate("bookings");

    if (!bookSetups) {
      throw new Error("No Bookings were found within these dates.");
    }

    return bookSetups.map((b) => b.toObject()) as BookSetupT[];
  });
