import { Dayjs } from "dayjs";
import { BookSetup } from "../models/BookSetup";
import { BookSetup as BookSetupType } from "../types/BookSetup.type";
import { useEffect, useState } from "react";
import { HydratedDocument } from "mongoose";

export const useBookSetups = (
  startDate: Dayjs | null,
  endDate: Dayjs | null
): {
  loading: boolean;
  bookSetups: HydratedDocument<BookSetupType>[];
} => {
  const [loading, setLoading] = useState(false);
  const [bookSetups, setBookSetups] = useState<
    HydratedDocument<BookSetupType>[]
  >([]);

  useEffect(() => {
    const fetchBookSetups = async () => {
      setLoading(true);

      const bookSetups = await BookSetup.find({
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      });

      if (!bookSetups) {
        throw new Error("No Bookings were found with within these dates.");
      }

      // https://stackoverflow.com/questions/19222520/populate-nested-array-in-mongoose
      // const populatedBookSetup = bookSetups.map((bookSetup) => {
      //   return await bookSetup.populate({
      //     path: "bookings",
      //     populate: {
      //       path: "patient",
      //       model: "Patient",
      //     },
      //   });
      // });

      setLoading(false);
      setBookSetups(bookSetups ?? []);
    };

    fetchBookSetups();
  }, [startDate, endDate]);

  return { loading, bookSetups };
};
