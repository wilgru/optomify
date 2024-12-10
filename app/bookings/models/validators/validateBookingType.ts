export const validateBookingType = {
  validator: function (value) {
    return [
      "general eye test",
      "health concern",
      "rms form",
      "re-check",
      "other",
      "blocked",
    ].includes(value);
  },
  message: (props) => `'${props.value}' is an invalid booking type`,
};
