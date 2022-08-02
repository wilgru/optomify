// https://stackoverflow.com/questions/5210376/how-to-get-first-and-last-day-of-the-current-week-in-javascript
export const getWeek = (date) => {
    const curr = new Date(); // get current date
    const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    const last = first + 6; // last day is the first day + 6
    
    const firstCurr = new Date(curr) // create a copy otherwise itll mess uo the original
    const firstDayWithHour = new Date(firstCurr.setDate(first));
    const firstDay = new Date(firstDayWithHour.setHours(0));
    // console.log(firstDay)

    const lastCurr = new Date(curr) // create a copy otherwise itll mess uo the original
    const lastDayWithHour = new Date(lastCurr.setDate(last));
    const lastDay = new Date(lastDayWithHour.setHours(23));
    // console.log(lastDay)

    return {
        firstDay,
        lastDay
    }
}

// date working
export const dateWorker = (date) => {
    let b = String(date)
    let c = b.split(" ", 5)
    let d = c.join(" ")
    let e = d+" UTC" 
    let f = new Date(e)
    let g = f.toISOString()
    let h = g.split(".")[0]
    let i = h+"+00.00"

    return i
}