const { Booking, BookSetup, ClinicalFile, Note, Patient, User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        getPatient: async (parent, { _id }, context) => {
            if (context.user) {
                try {
                    const patient = await Patient.findOne({_id});

                    if (!patient) {
                        throw new Error("No Patient was found with this ID.");
                    }

                    return patient.populate('bookings clinical_files notes created_by'); // return Patient
                } catch(e) {
                    throw new Error(`${e.message}`);
                }
            } else {
                throw new AuthenticationError('You must be signed in!');
            }
        },
        getAllPatients: async (parent, args, context) => {
            if (context.user) {
                try {
                    const patients = await Patient.find();

                    if (!patients) {
                        throw new Error("No Patients was found.");
                    }

                    return patients; // return Patient
                } catch(e) {
                    throw new Error(`${e.message}`);
                }
            } else {
                throw new AuthenticationError('You must be signed in!');
            }
        },
        getBookings: async (parent, { date }, context) => {
            if (context.user) {
                try {
                    const bookings = await Booking.find({date: new Date(date)});

                    if (!bookings) {
                        throw new Error("No Bookings were found with on this date.");
                    }

                    return bookings; // return Booking
                } catch(e) {
                    throw new Error(`${e.message}`);
                }
            } else {
                throw new AuthenticationError('You must be signed in!');
            }
        },
        getBookSetups: async (parent, { start_date, end_date }, context) => {
            if (context.user) {
                try {
                    const bookSetup = await BookSetup.find({
                        date: {
                            $gte: start_date,
                            $lte: end_date
                        }
                    })

                    if (!bookSetup) {
                        throw new Error("No Bookings were found with within these dates.");
                    }

                    // https://stackoverflow.com/questions/19222520/populate-nested-array-in-mongoose
                    const populateBookSetup = bookSetup.map((bookDay) => {
                        return bookDay.populate({ 
                            path: 'bookings',
                            populate: {
                                path: 'patient',
                                model: 'Patient'
                            } 
                        })
                    })

                    return populateBookSetup; // return [BookSetup]
                } catch(e) {
                    throw new Error(`${e.message}`);
                }
            } else {
                throw new AuthenticationError('You must be signed in!');
            }
        }
    },
    Mutation: {
        createNewUser: async (parent, { first_name, last_name, username, email, password }) => {
            try {
                const user = await User.create({ 
                    first_name, 
                    last_name, 
                    username, 
                    email, 
                    password 
                });

                const token = signToken(user);

                return { token, user }; // return Auth
            } catch(e) {
                throw new Error(`${e.message}`);
            }
        },
        login: async (parent, { email, password }) => {
            try {
                const user = await User.findOne({ email });
      
                if (!user) {
                  throw new AuthenticationError('Email or password was incorrect.');
                }
          
                const loginSuccess = await user.verifyPassword(password);
          
                if (!loginSuccess) {
                  throw new AuthenticationError('Email or password was incorrect.');
                }
          
                const token = signToken(user);
                console.log(token)
          
                return { token, user }; // return Auth
            } catch(e) {
                throw new Error(`${e.message}`);
            }
            
        },
        createNewPatient: async (parent, { first_name, last_name, dob, mobile_number, email, has_medicare, medicare_number, medicare_ref, medicare_exp }, context) => {
            if (context.user) {
                try {
                    const created_by = context.user._id;
                    const patient = await Patient.create({ 
                        first_name, 
                        last_name, 
                        dob, 
                        mobile_number, 
                        email, 
                        has_medicare, 
                        medicare_number,
                        medicare_ref, 
                        medicare_exp,
                        created_by
                    });
    
                    if (!patient) {
                        throw new Error(`${e.message}`)
                    }

                    return patient.populate('created_by'); // return User
                } catch(e) {
                    throw new Error(`${e.message}`);
                }
            } else {
                throw new AuthenticationError('You must be signed in!');
            }
        },
        createNewNote: async (parent, { title, text_field, on_patient_id }, context) => {
            if (context.user) {
                try {
                    const patient = await Patient.findById(on_patient_id);

                    if (!patient) {
                        throw new Error("could not find patient");
                    }

                    const created_by = context.user._id;
                    const noteData = await Note.create({ 
                        title, 
                        text_field, 
                        created_by
                    });
    
                    if (!noteData) {
                        throw new Error(`${e.message}`)
                    }

                    patient.notes.push(noteData);
                    await patient.save();

                    return patient.populate('notes'); // return Patient
                } catch(e) {
                    throw new Error(`${e.message}`);
                }
            } else {
                throw new AuthenticationError('You must be signed in!');
            }
        },
        createNewClinicalFile: async (parent, { on_patient_id, file_type, title, text_field, medicare_item_code, recall, ppr_sphere, ppr_cylinder, ppr_axis, ppl_sphere, ppl_cylinder, ppl_axis, pp_inter_add, pp_near_add, gpr_sphere, gpr_cylinder, gpr_axis, gpl_sphere, gpl_cylinder, gpl_axis, gp_inter_add, gp_near_add }, context) => {
            if (context.user) {
                try {
                    const patient = await Patient.findById(on_patient_id);

                    if (!patient) {
                        throw new Error("could not find patient");
                    }

                    const created_by = context.user._id;
                    const clinicalFileData = await ClinicalFile.create({
                        file_type,
                        title,
                        text_field,
                        medicare_item_code,
                        recall,
                        created_by,
                        prev_prescription: {
                            right_od: {
                                sphere: ppr_sphere,
                                cylinder: ppr_cylinder,
                                axis: ppr_axis
                            },
                            left_os: {
                                sphere: ppl_sphere,
                                cylinder: ppl_cylinder,
                                axis: ppl_axis
                            },
                            inter_add: pp_inter_add,
                            near_add: pp_near_add
                        },
                        given_prescription: {
                            right_od: {
                                sphere: gpr_sphere,
                                cylinder: gpr_cylinder,
                                axis: gpr_axis
                            },
                            left_os: {
                                sphere: gpl_sphere,
                                cylinder: gpl_cylinder,
                                axis: gpl_axis
                            },
                            inter_add: gp_inter_add,
                            near_add: gp_near_add
                        }
                    })

                    patient.clinical_files.push(clinicalFileData);
                    await patient.save();

                    return patient.populate('clinical_files');
                } catch(e) {
                    throw new Error(`${e.message}`);
                }
            } else {
                throw new AuthenticationError('You must be signed in!');
            }
        },
        updateClinicalFile: async (parent, { on_patient_id, file_to_update_id, file_type, title, text_field, medicare_item_code, recall, ppr_sphere, ppr_cylinder, ppr_axis, ppl_sphere, ppl_cylinder, ppl_axis, pp_inter_add, pp_near_add, gpr_sphere, gpr_cylinder, gpr_axis, gpl_sphere, gpl_cylinder, gpl_axis, gp_inter_add, gp_near_add }, context) => {
            if (context.user) {
                try {
                    const created_by = context.user._id;
                    let clinicalFileData = await ClinicalFile.findById(file_to_update_id)

                    clinicalFileData.file_type = file_type
                    clinicalFileData.title = title
                    clinicalFileData.text_field = text_field
                    clinicalFileData.medicare_item_code = medicare_item_code
                    clinicalFileData.recall = recall
                    clinicalFileData.created_by = created_by
                    clinicalFileData.prev_prescription.right_od.sphere = ppr_sphere
                    clinicalFileData.prev_prescription.right_od.cylinder = ppr_cylinder
                    clinicalFileData.prev_prescription.right_od.axis = ppr_axis
                    clinicalFileData.prev_prescription.left_os.sphere = ppl_sphere
                    clinicalFileData.prev_prescription.left_os.cylinder = ppl_cylinder
                    clinicalFileData.prev_prescription.left_os.axis = ppl_axis
                    clinicalFileData.prev_prescription.inter_add = pp_inter_add
                    clinicalFileData.prev_prescription.near_add = pp_near_add
                    clinicalFileData.given_prescription.right_od.sphere = gpr_sphere
                    clinicalFileData.given_prescription.right_od.cylinder = gpr_cylinder
                    clinicalFileData.given_prescription.right_od.axis = gpr_axis
                    clinicalFileData.given_prescription.left_os.sphere = gpl_sphere
                    clinicalFileData.given_prescription.left_os.cylinder = gpl_cylinder
                    clinicalFileData.given_prescription.left_os.axis = gpl_axis
                    clinicalFileData.given_prescription.inter_add = gp_inter_add
                    clinicalFileData.given_prescription.near_add = gp_near_add

                    await clinicalFileData.save()

                    // get the patient after the clinical file was updated
                    const patient = await Patient.findById(on_patient_id);

                    if (!patient) {
                        throw new Error("could not find patient");
                    }

                    return patient.populate('bookings clinical_files notes created_by');
                } catch(e) {
                    throw new Error(`${e.message}`);
                }
            } else {
                throw new AuthenticationError('You must be signed in!');
            }
        },
        setupBook: async (parent, { date, open_time, closing_time, optom_break_start, optom_break_end }, context) => {
            if (context.user) {
                try {
                    const convBookSetupDate = new Date(date);
                    const convBookSetupOpen = new Date(open_time);
                    const convBookSetupClosing = new Date(closing_time);
                    const convBreakStart = new Date(optom_break_start);
                    const convBreakEnd = new Date(optom_break_end);

                    const newBookSetup = await BookSetup.create({ 
                        date: convBookSetupDate,
                        open_time: convBookSetupOpen,
                        closing_time: convBookSetupClosing,
                        optom_break_start: convBreakStart,
                        optom_break_end: convBreakEnd
                    });

                    return newBookSetup;

                } catch(e) {
                    throw new Error(`${e.message}`);
                }
            } else {
                throw new AuthenticationError('You must be signed in!');
            }
        },
        createNewBooking: async (parent, { booking_date, booking_start, booking_end, on_patient_id, booking_note, booking_type }, context) => {
            if (context.user) {
                try {
                    const patient = await Patient.findById(on_patient_id);

                    if (!patient) {
                        throw new Error("could not find patient");
                    }

                    const convBookingDate = new Date(booking_date);
                    const convBookingStart = new Date(booking_start);
                    const convBookingEnd = new Date(booking_end);

                    // using $expr allows the use of aggregate operators, which would include all the date opertions. Also using $expr/aggirgate version of $eq.
                    const bookSetup = await BookSetup.findOne({
                        $and: [
                            { $expr: {$eq: [{$dayOfMonth: "$date"}, convBookingDate.getDate()]} },
                            { $expr: {$eq: [{$month: "$date"}, convBookingDate.getMonth() + 1]} },
                            { $expr: {$eq: [{$year: "$date"}, convBookingDate.getFullYear()]} }
                        ]
                    })

                    if (!bookSetup) {
                        throw new Error("could not day to book on");
                    }

                    const created_by = context.user._id;
                    const newBooking = await Booking.create({ 
                        booking_date: convBookingDate, 
                        booking_start: convBookingStart, 
                        booking_end: convBookingEnd, 
                        patient: on_patient_id, 
                        booking_note, 
                        booking_type,
                        created_by
                    })

                    patient.bookings.push(newBooking);
                    await patient.save();

                    bookSetup.bookings.push(newBooking);
                    await bookSetup.save();

                    return patient.populate('bookings');

                } catch(e) {
                    throw new Error(`${e.message}`);
                }
            } else {
                throw new AuthenticationError('You must be signed in!');
            }
        },
        createNewPatientAndBooking: async (parent, { first_name, last_name, dob, mobile_number, email, has_medicare, medicare_number, medicare_ref, medicare_exp, booking_date, booking_start, booking_end, booking_note, booking_type }, context) => {
            if (context.user) {
                try {
                    // const patient = await Patient.findById(on_patient_id);

                    // if (!patient) {
                    //     throw new Error("could not find patient");
                    // }

                    const created_by = context.user._id;
                    const patient = await Patient.create({ 
                        first_name, 
                        last_name, 
                        dob, 
                        mobile_number, 
                        email, 
                        has_medicare, 
                        medicare_number,
                        medicare_ref, 
                        medicare_exp,
                        created_by
                    });
    
                    if (!patient) {
                        throw new Error(`${e.message}`)
                    }

                    const convBookingDate = new Date(booking_date);
                    const convBookingStart = new Date(booking_start);
                    const convBookingEnd = new Date(booking_end);

                    // using $expr allows the use of aggregate operators, which would include all the date opertions. Also using $expr/aggirgate version of $eq.
                    const bookSetup = await BookSetup.findOne({
                        $and: [
                            { $expr: {$eq: [{$dayOfMonth: "$date"}, convBookingDate.getDate()]} },
                            { $expr: {$eq: [{$month: "$date"}, convBookingDate.getMonth() + 1]} },
                            { $expr: {$eq: [{$year: "$date"}, convBookingDate.getFullYear()]} }
                        ]
                    })

                    if (!bookSetup) {
                        throw new Error("could not find day to book on");
                    }

                    const newBooking = await Booking.create({ 
                        booking_date: convBookingDate, 
                        booking_start: convBookingStart, 
                        booking_end: convBookingEnd, 
                        patient: patient._id, 
                        booking_note, 
                        booking_type,
                        created_by
                    })

                    patient.bookings.push(newBooking);
                    await patient.save();

                    bookSetup.bookings.push(newBooking);
                    await bookSetup.save();

                    return bookSetup.populate({
                        path: 'bookings',
                        populate: {
                            path: 'patient',
                            model: 'Patient'
                        } 
                    });

                } catch(e) {
                    throw new Error(`${e.message}`);
                }
            } else {
                throw new AuthenticationError('You must be signed in!');
            }
        },
        updateBooking: async (parent, {booking_to_update_id, update_action, start_date, end_date}, context) => {
            if (context.user) {
                try {
                    const booking = await Booking.findById(booking_to_update_id);

                    if (!booking) {
                        throw new Error("could not find booking");
                    }

                    console.log(update_action)
                    switch (update_action) {
                        case "Confirm":
                            booking.booking_status = "Confirmed"
                            break;
                        case "Arrive":
                            booking.booking_status = "Arrived"
                            break;
                        case "Absent":
                            booking.booking_status = "Absent"
                            break;
                        default:
                            throw new Error(`Action unknown`);
                    }

                    await booking.save();

                    // return booking;

                    // now get the booksetps and return them
                    const bookSetup = await BookSetup.find({
                        date: {
                            $gte: start_date,
                            $lte: end_date
                        }
                    })

                    if (!bookSetup) {
                        throw new Error("No Bookings were found with within these dates.");
                    }

                    // https://stackoverflow.com/questions/19222520/populate-nested-array-in-mongoose
                    const populateBookSetup = bookSetup.map((bookDay) => {
                        return bookDay.populate({ 
                            path: 'bookings',
                            populate: {
                                path: 'patient',
                                model: 'Patient'
                            } 
                        })
                    })

                    return populateBookSetup; // return [BookSetup]

                } catch(e) {
                    throw new Error(`${e.message}`);
                }
            } else {
                throw new AuthenticationError('You must be signed in!');
            }
        },
        deleteBooking: async (parent, {booking_to_delete_id, start_date, end_date}, context) => {
            if (context.user) {
                try {
                    const booking = await Booking.findOneAndDelete({ _id: booking_to_delete_id });

                    if (!booking) {
                        throw new Error("could not find booking");
                    }

                    // await booking.save();

                    // now get the booksetps and return them
                    const bookSetup = await BookSetup.find({
                        date: {
                            $gte: start_date,
                            $lte: end_date
                        }
                    })

                    if (!bookSetup) {
                        throw new Error("No Bookings were found with within these dates.");
                    }

                    // https://stackoverflow.com/questions/19222520/populate-nested-array-in-mongoose
                    const populateBookSetup = bookSetup.map((bookDay) => {
                        return bookDay.populate({ 
                            path: 'bookings',
                            populate: {
                                path: 'patient',
                                model: 'Patient'
                            } 
                        })
                    })

                    return populateBookSetup; // return [BookSetup]

                } catch(e) {
                    throw new Error(`${e.message}`);
                }
            } else {
                throw new AuthenticationError('You must be signed in!');
            }
        },
        updatePatient: async (parent, { patient_to_update_id, first_name, last_name, dob, mobile_number, email, has_medicare, medicare_number, medicare_ref, medicare_exp }, context) => {
            if (context.user) {
                try {
                    const patient = await Patient.findById(patient_to_update_id)
                    
                    patient.first_name = first_name
                    patient.last_name = last_name
                    patient.dob = dob
                    patient.mobile_number = mobile_number
                    patient.email = email
                    patient.has_medicare = has_medicare
                    patient.medicare_number = medicare_number
                    patient.medicare_ref = medicare_ref
                    patient.medicare_exp = medicare_exp

                    await patient.save();
    
                    if (!patient) {
                        throw new Error(`${e.message}`)
                    }

                    return patient.populate('bookings clinical_files notes created_by'); // return User
                } catch(e) {
                    throw new Error(`${e.message}`);
                }
            } else {
                throw new AuthenticationError('You must be signed in!');
            }
        }
    }
}

module.exports = resolvers;