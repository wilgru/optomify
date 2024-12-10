export const validateBookingStatus = {
  validator: function (value) {
    return ["booked", "confirmed", "arrived", "absent", "cancelled"].includes(
      value
    );
  },
  message: (props) => `'${props.value}' is an invalid booking status`,
};
