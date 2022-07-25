const { Booking, BookSetup, ClinicalFile, Note, Patient, User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        getPatient: async (parent, { _id }, context) => {
            if (context.user) {
                try {
                    const patient = await User.findOne({_id});

                    if (!patient) {
                        throw new Error("No Patient was found with this ID.");
                    }

                    return patient; // return Patient
                } catch(e) {
                    throw new Error(`something went wrong! Details: ${e.message}`);
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
                throw new Error(`something went wrong! Details: ${e.message}`);
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
          
                return { token, user }; // return Auth
            } catch(e) {
                throw new Error(`something went wrong! Details: ${e.message}`);
            }
            
        },
        createNewPatient: async (parent, { first_name, last_name, dob, mobile_number, email, has_medicare, medicare_ref, medicare_exp }, context) => {
            if (context.user) {
                try {
                    const created_by = context.user._id;
                    const data = await Patient.create({ 
                        first_name, 
                        last_name, 
                        dob, 
                        mobile_number, 
                        email, 
                        has_medicare, 
                        medicare_ref, 
                        medicare_exp,
                        created_by
                    });
    
                    if (!data) {
                        throw new Error(`something went wrong! Details: ${e.message}`)
                    }

                    return data.populate('created_by'); // return User
                } catch(e) {
                    throw new Error(`something went wrong! Details: ${e.message}`);
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
                        throw new Error(`something went wrong! Details: ${e.message}`)
                    }

                    patient.notes.push(noteData);
                    await patient.save();

                    return patient.populate('notes'); // return Patient
                } catch(e) {
                    throw new Error(`something went wrong! Details: ${e.message}`);
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
                                ppr_sphere,
                                ppr_cylinder,
                                ppr_axis
                            },
                            left_os: {
                                ppl_sphere,
                                ppl_cylinder,
                                ppl_axis
                            },
                            pp_inter_add,
                            pp_near_add
                        },
                        given_prescription: {
                            right_od: {
                                gpr_sphere,
                                gpr_cylinder,
                                gpr_axis
                            },
                            left_os: {
                                gpl_sphere,
                                gpl_cylinder,
                                gpl_axis
                            },
                            gp_inter_add,
                            gp_near_add
                        }
                    })

                    patient.clinical_files.push(clinicalFileData);
                    await patient.save();

                    return patient.populate('clinical_notes').populate('prev_prescription').populate('given_prescription');
                } catch(e) {
                    throw new Error(`something went wrong! Details: ${e.message}`);
                }
            } else {
                throw new AuthenticationError('You must be signed in!');
            }
        }
    }
}

module.exports = resolvers;