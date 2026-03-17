import { createServerFn } from "@tanstack/react-start";
import dbConnect from "../../lib/dbConnect";
import Patient from "../../patients/models/Patient";
import { PatientT } from "../../patients/types/Patient.type";
import Booking from "../models/Booking";
import { TimeSlotT } from "../types/BookSetup.type";

export const createPatientAndBooking = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      values: PatientT & { bookingType: string; note: string };
      timeSlot: TimeSlotT;
    }) => data,
  )
  .handler(async ({ data }) => {
    await dbConnect();

    const patient = new Patient({
      firstName: data.values.firstName,
      lastName: data.values.lastName,
      dob: data.values.dob,
      phone: data.values.phone,
      email: data.values.email,
      medicareNumber: data.values.medicareNumber,
      medicareRef: data.values.medicareRef,
      medicareExp: data.values.medicareExp,
    });
    await patient.save();

    const booking = new Booking({
      patient: patient._id,
      type: data.values.bookingType,
      bookingTime: data.timeSlot.time,
      durationMins: 30,
      note: data.values.note || null,
    });
    await booking.save();

    return { success: true };
  });
