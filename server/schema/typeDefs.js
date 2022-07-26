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
        sphere: Float
        cylinder: Float
        axis: Float
    }

    type Prescription {
        right_od: PrescriptionSet
        left_os: PrescriptionSet
        inter_add: Float
        near_add: Float
    }

    type ClinicalFile {
        _id: ID!
        file_type: String
        title: String!
        date_created: String!
        text_field: String!
        medicare_item_code: String
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
        username: String!
        password: String!
        email: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        getPatient(_id: ID!): Patient
    }

    type Mutation {
        createNewUser(first_name: String!, last_name: String!, username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        createNewPatient(first_name: String!, last_name: String!, dob: String!, mobile_number: String, email: String!, has_medicare: Boolean!, medicare_ref: String, medicare_exp: String): Patient
        createNewNote(title: String!, text_field: String!, on_patient_id: ID!): Patient
        createNewClinicalFile(on_patient_id: ID!, file_type: String!, title: String!, text_field: String!, medicare_item_code: String, recall: String, ppr_sphere: Float, ppr_cylinder: Float, ppr_axis: Float, ppl_sphere: Float, ppl_cylinder: Float, ppl_axis: Float, pp_inter_add: Float, pp_near_add: Float, gpr_sphere: Float, gpr_cylinder: Float, gpr_axis: Float, gpl_sphere: Float, gpl_cylinder: Float, gpl_axis: Float, gp_inter_add: Float, gp_near_add: Float): Patient
        createNewBooking(booking_date: String!, booking_start: String!, booking_end: String!, on_patient_id: ID!, booking_note: String, booking_type: String!): Patient
        setupBook(date: String!, open_time: String!, closing_time: String!, optom_break_start: String!): BookSetup
    }
`

