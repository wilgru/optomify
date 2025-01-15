"use server";

import Patient from "../../patients/models/Patient";
import { PatientT } from "../../patients/types/Patient.type";
import { Booking } from "../models/Booking";
import { TimeSlotT } from "../types/BookSetup.type";

export const createPatientAndBooking = async (
  values: PatientT & { bookingType: string; note: string },
  timeSlot: TimeSlotT
) => {
  const patient = new Patient({
    firstName: values.firstName,
    lastName: values.lastName,
    dob: values.dob,
    phone: values.phone,
    email: values.email,
    medicareNumber: values.medicareNumber,
    medicareRef: values.medicareRef,
    medicareExp: values.medicareExp,
  });
  await patient.save();

  const booking = new Booking({
    patient: patient._id,
    type: values.bookingType,
    bookingTime: timeSlot.time,
    durationMins: 30,
    note: values.note || null,
  });
  await booking.save();
};
