import { Dayjs } from "dayjs";
import { BookSetup } from "../models/BookSetup";
import { BookSetupT } from "../types/BookSetup.type";
import { HydratedDocument } from "mongoose";

export const getBookSetups = async (
  startDate: Dayjs | null,
  endDate: Dayjs | null
): Promise<HydratedDocument<BookSetupT>[]> => {
  const bookSetups = await BookSetup.find({
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  });

  if (!bookSetups) {
    throw new Error("No Bookings were found with within these dates.");
  }

  return bookSetups;
};
