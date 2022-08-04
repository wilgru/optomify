import moment from 'moment';

// https://stackoverflow.com/questions/5210376/how-to-get-first-and-last-day-of-the-current-week-in-javascript
export const getWeek = (date) => {
    const curr = new Date(); // get current date
    const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    const last = first + 6; // last day is the first day + 6
    
    const firstCurr = new Date(curr) // create a copy otherwise itll mess uo the original
    const firstDayWithHour = new Date(firstCurr.setDate(first));
    const firstDay = new Date(firstDayWithHour.setHours(10, 0, 0, 0));
    // console.log(firstDay)

    const lastCurr = new Date(curr) // create a copy otherwise itll mess uo the original
    const lastDayWithHour = new Date(lastCurr.setDate(last));
    const lastDay = new Date(lastDayWithHour.setHours(10, 0, 0, 0));
    // console.log(lastDay)

    return {
        firstDay,
        lastDay
    }
}

export const getTimeRelation = (nowTime, checkingTime) => {
    // console.log(nowTime, checkingTime)
    if (moment(checkingTime).isBefore(nowTime) && moment(nowTime).isBefore(moment(checkingTime).add(30, 'm'))) {
        return "current"
    } else if (moment(checkingTime).isBefore(nowTime)) {
        return "past"
    } else {
        return "future"
    }
}

// date working
export const dateWorker = (date) => {
    // should get a date string, and is essentially just adding 10hrs. will return same type of string just 10 hours in the future.
    return moment(date).add(10, 'h').toDate()
}

// date working
// export const dateWorker = (date) => {
//     let b = String(date)
//     let c = b.split(" ", 5)
//     let d = c.join(" ")
//     let e = d+" UTC" 
//     let f = new Date(e)
//     let g = f.toISOString()
//     let h = g.split(".")[0]
//     let i = h+"+00.00"

//     return i
// }