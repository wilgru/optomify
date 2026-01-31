import { Schema, model, models } from "mongoose";
// import { validate30MinBlock } from "./validators/validate30MinBlock";
import { BookSetupT } from "../types/BookSetup.type";

const bookSetupSchema = new Schema<BookSetupT>({
  date: {
    type: Date,
    required: true,
    unique: true,
    // validate: validate30MinBlock,
  },
  openTime: {
    type: Date,
    required: true,
    // validate: validate30MinBlock,
  },
  closingTime: {
    type: Date,
    required: true,
    // validate: validate30MinBlock,
  },
  break: {
    type: Date,
    required: true,
    // validate: validate30MinBlock,
  },
  bookings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
});

// uses hook to make sure a made booking falls within the 30 min blocks. otherwise return error and do not allow booking to be made

const BookSetup =
  models.BookSetup || model<BookSetupT>("BookSetup", bookSetupSchema);

export default BookSetup;
