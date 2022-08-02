import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password ) {
            token,
            user {
                username
            }
        }
    }
`

export const CREATE_NEW_PATIENT = gql`
    mutation CreateNewPatient($firstName: String!, $lastName: String!, $dob: String!, $mobileNumber: String, $email: String!, $hasMedicare: Boolean!, $medicareRef: String, $medicareExp: String) {
  createNewPatient(first_name: $firstName, last_name: $lastName, dob: $dob, mobile_number: $mobileNumber, email: $email, has_medicare: $hasMedicare, medicare_ref: $medicareRef, medicare_exp: $medicareExp) {
    _id
    first_name
    last_name
    date_created
    created_by {
      _id
      username
    }
  }
}
`

export const CREATE_NEW_BOOKING = gql`
   mutation CreateNewBooking($bookingDate: String!, $bookingStart: String!, $bookingEnd: String!, $onPatientId: ID, $bookingType: String!, $bookingNote: String) {
  createNewBooking(booking_date: $bookingDate, booking_start: $bookingStart, booking_end: $bookingEnd, on_patient_id: $onPatientId, booking_type: $bookingType, booking_note: $bookingNote) {
    _id
  }
}
`

export const CREATE_NEW_PATIENT_AND_BOOKING = gql`
    mutation CreateNewPatientAndBooking($firstName: String!, $lastName: String!, $dob: String!, $email: String!, $mobileNumber: String, $hasMedicare: Boolean!, $medicareNumber: String, $medicareRef: String, $medicareExp: String, $bookingDate: String!, $bookingStart: String!, $bookingEnd: String!, $bookingType: String!, $bookingNote: String) {
    createNewPatientAndBooking(first_name: $firstName, last_name: $lastName, dob: $dob, email: $email, mobile_number: $mobileNumber, has_medicare: $hasMedicare, medicare_number: $medicareNumber, medicare_ref: $medicareRef, medicare_exp: $medicareExp, booking_date: $bookingDate, booking_start: $bookingStart, booking_end: $bookingEnd, booking_type: $bookingType, booking_note: $bookingNote) {
        _id
        date
        open_time
        closing_time
        optom_break_start
        optom_break_end
        bookings {
        _id
        booking_date
        booking_start
        booking_end
        patient {
            _id
            first_name
            last_name
            dob
            mobile_number
            email
        }
        booking_note
        booking_type
        date_created
        }
    }
}`

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`

export const CREATE_ACCOUNT = gql`
mutation CreateNewUser($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!) {
  createNewUser(first_name: $firstName, last_name: $lastName, username: $username, email: $email, password: $password) {
    token 
    user {
      _id
      username
    }
  }
}
`

export const CREATE_NEW_CLINICAL_FILE = gql`
mutation CreateNewClinicalFile($on_patient_id:ID!, $fileType: String!, $title: String!, $textField: String!, $medicareItemCode: String, $pprCylinder: Float, $pprSphere: Float, $pprAxis: Float, $pplSphere: Float, $pplCylinder: Float, $gpNearAdd: Float, $gpInterAdd: Float, $gplAxis: Float, $gplCylinder: Float, $gplSphere: Float, $gprAxis: Float, $gprCylinder: Float, $gprSphere: Float, $ppNearAdd: Float, $ppInterAdd: Float, $pplAxis: Float) {
  createNewClinicalFile(on_patient_id:$on_patient_id file_type: $fileType, title: $title, text_field: $textField, medicare_item_code: $medicareItemCode, ppr_cylinder: $pprCylinder, ppr_sphere: $pprSphere, ppr_axis: $pprAxis, ppl_sphere: $pplSphere, ppl_cylinder: $pplCylinder, gp_near_add: $gpNearAdd, gp_inter_add: $gpInterAdd, gpl_axis: $gplAxis, gpl_cylinder: $gplCylinder, gpl_sphere: $gplSphere, gpr_axis: $gprAxis, gpr_cylinder: $gprCylinder, gpr_sphere: $gprSphere, pp_near_add: $ppNearAdd, pp_inter_add: $ppInterAdd, ppl_axis: $pplAxis) {
    _id
    first_name
    clinical_files {
      _id
      title
      prev_prescription {
        right_od {
          sphere
        }
        left_os {
          sphere
        }
      }
      given_prescription {
        right_od {
          sphere
        }
        left_os {
          sphere
        }
      }
    }
  }
}
`

export const UPDATE_CLINICAL_FILE = gql`
mutation UpdateClinicalFile($onPatientId: ID!, $fileToUpdateId: ID!, $fileType: String!, $title: String!, $textField: String!, $medicareItemCode: String, $recall: String, $pprSphere: Float, $pprCylinder: Float, $pprAxis: Float, $pplSphere: Float, $pplCylinder: Float, $pplAxis: Float, $ppInterAdd: Float, $ppNearAdd: Float, $gprSphere: Float, $gprCylinder: Float, $gprAxis: Float, $gplSphere: Float, $gplCylinder: Float, $gplAxis: Float, $gpInterAdd: Float, $gpNearAdd: Float) {
  updateClinicalFile(on_patient_id: $onPatientId, file_to_update_id: $fileToUpdateId, file_type: $fileType, title: $title, text_field: $textField, medicare_item_code: $medicareItemCode, recall: $recall, ppr_sphere: $pprSphere, ppr_cylinder: $pprCylinder, ppr_axis: $pprAxis, ppl_sphere: $pplSphere, ppl_cylinder: $pplCylinder, ppl_axis: $pplAxis, pp_inter_add: $ppInterAdd, pp_near_add: $ppNearAdd, gpr_sphere: $gprSphere, gpr_cylinder: $gprCylinder, gpr_axis: $gprAxis, gpl_sphere: $gplSphere, gpl_cylinder: $gplCylinder, gpl_axis: $gplAxis, gp_inter_add: $gpInterAdd, gp_near_add: $gpNearAdd) {
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
}
`

export const UPDATE_BOOKING = gql`
mutation UpdateBooking($bookingToUpdateId: ID!, $updateAction: String!, $startDate: String!, $endDate: String!) {
  updateBooking(booking_to_update_id: $bookingToUpdateId, update_action: $updateAction, start_date: $startDate, end_date: $endDate) {
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
        _id
        first_name
        last_name
      }
    }
  }
}
`

export const UPDATE_PATIENT = gql`
mutation UpdatePatient($patientToUpdateId: ID!, $firstName: String!, $lastName: String!, $dob: String!, $email: String!, $hasMedicare: Boolean!, $medicareNumber: String, $medicareRef: String, $medicareExp: String, $mobileNumber: String) {
  updatePatient(patient_to_update_id: $patientToUpdateId, first_name: $firstName, last_name: $lastName, dob: $dob, email: $email, has_medicare: $hasMedicare, medicare_number: $medicareNumber, medicare_ref: $medicareRef, medicare_exp: $medicareExp, mobile_number: $mobileNumber) {
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

export const DELETE_BOOKING = gql`
mutation DeleteBooking($bookingToDeleteId: ID!, $startDate: String!, $endDate: String!) {
  deleteBooking(booking_to_delete_id: $bookingToDeleteId, start_date: $startDate, end_date: $endDate) {
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
        _id
        first_name
        last_name
      }
    }
  }
}`

export const SETUP_BOOK = gql`
mutation SetupBook($date: String!, $openTime: String!, $closingTime: String!, $optomBreakStart: String!, $optomBreakEnd: String!) {
  setupBook(date: $date, open_time: $openTime, closing_time: $closingTime, optom_break_start: $optomBreakStart, optom_break_end: $optomBreakEnd) {
    _id
    date
    open_time
    closing_time
  }
}
`

export const CREATE_NEW_NOTE = gql`
mutation CreateNewNote($onPatientId: ID!, $title: String!, $textField: String!) {
  createNewNote(on_patient_id: $onPatientId, title: $title, text_field: $textField) {
    _id
    notes {
      title
      text_field
    }
  }
}`

export const UPDATE_NOTE = gql`
mutation updateNote($onPatientId: ID!, $title: String!, $textField: String!, $noteToUpdateId: ID!) {
  updateNote(on_patient_id: $onPatientId, title: $title, text_field: $textField, note_to_update_id: $noteToUpdateId) {
    _id
    notes {
      title
      text_field
    }
  }
}`