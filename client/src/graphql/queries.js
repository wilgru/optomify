import { gql } from '@apollo/client';

export const GET_BOOK_SETUPS = gql`
    query GetBookSetups($startDate: String!, $endDate: String!) {
    getBookSetups(start_date: $startDate, end_date: $endDate) {
        _id
        date
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