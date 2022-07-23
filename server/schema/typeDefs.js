const { gql } = require("apollo-server-express")

module.exports = gql`

    type Note {
        _id: ID!
        title: String!
        date_created: String!
        text_field: String!
        created_by: User!
    }

    type PrescriptionSet {
        sphere: Int
        cylinder: Int
        axis: Int
    }

    type Prescription {
        right_od: PrescriptionSet!
        left_os: PrescriptionSet!
        inter_add: Int
        near_add: Int
    }

    type ClinicalFile {
        _id: ID!
        file_type: String
        title: String!
        date_created: String!
        text_field: String!
        medicare_item_code: String!
        recall: String
        created_by: User!
        prev_prescription: Prescription
        given_prescription: Prescription
    }

    type Patient {
        _id: ID!
        first_name: String!
        last_name: String!
        dob: String!
        mobile_number: String
        email: String!
        has_medicare: Boolean!
        medicare_number: String
        medicare_ref: String
        medicare_exp: String
        bookings: [Booking]
        clinical_files: [ClinicalFile]
        notes: [Note]
        date_created: String
        created_by: User!
    }

    type Booking {
        _id: ID!
        booking_date: String!
        booking_start: String!
        booking_end: String!
        patient: Patient
        booking_note: String
        booking_type: String!
        date_created: String
        created_by: User!
    }

    type BookSetup {
        _id: ID!
        date: String!
        open_time: String!
        closing_time: String!
        optom_break_start: String!
        bookings: [Booking]
    }

    type User {
        _id: ID!
        first_name: String!
        last_name: String!
        password: String!
        email: String!
        
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        createNewPatient(first_name: String, last_name: String, dob: String, mobile_number: String, email: String, has_medicare: Boolean, medicare_ref: String, medicare_exp: String, created_by: ID): Patient
        createNewUser(first_name: String!, last_name: String!, username: String!, email: String!, password: String!): User
    }

    # type Mutation {
        
    # }
`