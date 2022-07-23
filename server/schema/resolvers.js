const { Booking, BookSetup, ClinicalFile, Note, Patient, User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Mutation: {
        createNewUser: (parent, args) => {
            try {
                const data = awaitUser.create({ first_name: args.first_name, last_name: args.last_name, username: args.username, email: args.email, password: args.password });
                return data;
            } catch(e) {
                throw new Error("something went wrong! Details:\n\n", e.message);
            }

        },
        createNewPatient: (parent, args, context) => {
            Patient.create();
        }
    }
}

module.exports = resolvers;