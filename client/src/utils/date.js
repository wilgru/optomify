// https://stackoverflow.com/questions/5210376/how-to-get-first-and-last-day-of-the-current-week-in-javascript
export const getWeek = (date) => {
    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    
    var firstDay = new Date(curr.setDate(first));
    var lastDay = new Date(curr.setDate(last));

    return {
        firstDay,
        lastDay
    }
}