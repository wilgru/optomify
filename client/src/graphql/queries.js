import { gql } from '@apollo/client';

export const GET_PATIENT = gql`
query GetPatient($id: ID!) {
  getPatient(_id: $id) {
    _id
    first_name
    last_name
    mobile_number
    email
    dob
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
      file_type
      title
      date_created
      text_field
      medicare_item_code
      recall
      prev_prescription {
        right_od {
          sphere
          cylinder
          axis
        }
        left_os {
          sphere
          cylinder
          axis
        }
        inter_add
        near_add
      }
      given_prescription {
        right_od {
          sphere
          cylinder
          axis
        }
        left_os {
          sphere
          cylinder
          axis
        }
        inter_add
        near_add
      }
    }
    notes {
      _id
    }
    date_created 
    created_by {
      _id
      username
    }
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
            booking_status
            patient {
                first_name
                last_name
            }
        }
    }
}
`;