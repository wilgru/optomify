// import { exists } from "../BookSetup";

// export const validateBookIsSetUp = {
//   validator: async function (value) {
//     const found = await exists({
//       $and: [
//         { $expr: { $eq: [{ $dayOfMonth: "$date" }, value.getDate()] } },
//         { $expr: { $eq: [{ $month: "$date" }, value.getMonth() + 1] } },
//         { $expr: { $eq: [{ $year: "$date" }, value.getFullYear()] } },
//       ],
//     });

//     return found != null;
//   },
//   message: "Cant book for a day that doesnt exist",
// };
