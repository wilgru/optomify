import dayjs, { Dayjs } from "dayjs";

// https://stackoverflow.com/questions/5210376/how-to-get-first-and-last-day-of-the-current-week-in-javascript
export const getCurrentWeek = (): [Dayjs, Dayjs] => {
  const curr = dayjs(); // get current date
  // const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  // const last = first + 6; // last day is the first day + 6

  // const firstCurr = dayjs(curr); // create a copy otherwise itll mess uo the original
  // const firstDayWithHour = dayjs(firstCurr.setDate(first));
  // const firstDay = dayjs(firstDayWithHour.setHours(10, 0, 0, 0));
  // // console.log(firstDay)

  // const lastCurr = dayjs(curr); // create a copy otherwise itll mess uo the original
  // const lastDayWithHour = dayjs(lastCurr.setDate(last));
  // const lastDay = dayjs(lastDayWithHour.setHours(10, 0, 0, 0));
  // // console.log(lastDay)

  const start = curr.startOf("week");
  const end = curr.startOf("week");

  return [start, end];
};
