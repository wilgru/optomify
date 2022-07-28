import { gql } from '@apollo/client';

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