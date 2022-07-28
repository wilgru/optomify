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
        optom_break_end: String!
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
        getAllPatients: [Patient]
        getBookings(date: String!): Booking
        getBookSetups(start_date: String!, end_date: String!): [BookSetup]
    }

    type Mutation {
        createNewUser(first_name: String!, last_name: String!, username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        createNewPatient(first_name: String!, last_name: String!, dob: String!, mobile_number: String, email: String!, has_medicare: Boolean!, medicare_ref: String, medicare_exp: String): Patient
        createNewNote(title: String!, text_field: String!, on_patient_id: ID!): Patient
        createNewClinicalFile(on_patient_id: ID!, file_type: String!, title: String!, text_field: String!, medicare_item_code: String, recall: String, ppr_sphere: Float, ppr_cylinder: Float, ppr_axis: Float, ppl_sphere: Float, ppl_cylinder: Float, ppl_axis: Float, pp_inter_add: Float, pp_near_add: Float, gpr_sphere: Float, gpr_cylinder: Float, gpr_axis: Float, gpl_sphere: Float, gpl_cylinder: Float, gpl_axis: Float, gp_inter_add: Float, gp_near_add: Float): Patient
        createNewBooking(booking_date: String!, booking_start: String!, booking_end: String!, on_patient_id: ID!, booking_note: String, booking_type: String!): Patient
        setupBook(date: String!, open_time: String!, closing_time: String!, optom_break_start: String!, optom_break_end: String!): BookSetup
        createNewPatientAndBooking(first_name: String!, last_name: String!, dob: String!, mobile_number: String, email: String!, has_medicare: Boolean!, medicare_ref: String, medicare_exp: String, booking_date: String!, booking_start: String!, booking_end: String!, booking_note: String, booking_type: String!): BookSetup
    }
`

// https://stackoverflow.com/questions/49792726/insert-wrong-date-in-mongodb
// When you create new dates with just date or date and time, it usually creates them in the same timezone as the program is.
// So if you dont specify the timezone, it becomes the timezone the server is in. When you save to Mongo, the Date is serialized to UTC -> zero timezone.
// Create the dates with +00:00 timezone and you should have consistent data.

// https://stackoverflow.com/questions/18907566/mongodb-query-specific-monthyear-not-date
// With MongoDB 3.6 and newer, you can use the $expr operator in your find() query. This allows you to build query expressions that compare fields from the same document in a $match stage.
// MongoDB $expr -> https://www.mongodb.com/docs/manual/reference/operator/query/expr/
// aggregate pipeline (what $expr allows the use of ) -> https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions