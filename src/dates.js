const dayjs = require("dayjs")

const Format = (date) => {
    let newDate = dayjs(date + "Z");

    return {
        day: newDate.format('dddd D MMMM'),
        time: newDate.format('h:mm a'),
        date: newDate.format('DD/MM/YY'),
        dayYear: newDate.format('dddd D MMMM YYYY')
    }
}

export { Format };