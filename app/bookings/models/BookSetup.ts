import { Schema, model } from "mongoose";
import { validate30MinBlock } from "./validators/validate30MinBlock";
import { Dayjs } from "dayjs";
import { BookSetup as BookSetupType } from "../types/BookSetup.type";

const bookSetupSchema = new Schema<BookSetupType>({
  date: {
    type: Dayjs,
    required: true,
    unique: true,
    validate: validate30MinBlock,
  },
  openTime: {
    type: Dayjs,
    required: true,
    validate: validate30MinBlock,
  },
  closingTime: {
    type: Dayjs,
    required: true,
    validate: validate30MinBlock,
  },
  break: {
    type: Dayjs,
    required: true,
    validate: validate30MinBlock,
  },
  bookings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
});

// uses hook to make sure a made booking falls within the 30 min blocks. otherwise return error and do not allow booking to be made

export const BookSetup = model<BookSetupType>("BookSetup", bookSetupSchema);
