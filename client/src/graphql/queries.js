import { gql } from '@apollo/client';

export const GET_PATIENT = gql`
query GetAllPatients($id: ID!) {
  getPatient(_id: $id) {
    _id
    first_name
    last_name
    mobile_number
    email
    has_medicare
    medicare_number
    medicare_ref
    medicare_exp
    bookings {
      _id
      booking_date
      booking_start
    }
    clinical_files {
      _id
    }
    notes {
      _id
    }
    date_created 
    created_by
  }
}`

export const GET_ALL_PATIENTS = gql`
query GetAllPatients {
  getAllPatients {
    _id
    first_name
    last_name
    mobile_number
    email
  }
}`

export const GET_BOOK_SETUPS = gql`
    query GetBookSetups($startDate: String!, $endDate: String!) {
    getBookSetups(start_date: $startDate, end_date: $endDate) {
        _id
        date
        open_time
        closing_time
        optom_break_start
        optom_break_end
        bookings {
            _id
            booking_start
            booking_end
            booking_note
            booking_type
            patient {
                first_name
                last_name
            }
        }
    }
}
`;