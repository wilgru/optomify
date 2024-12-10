export const validate30MinBlock = {
  validator: function (value) {
    return value.getMinutes() % 30 === 0;
  },
  message: "not in a 30 min block",
};
