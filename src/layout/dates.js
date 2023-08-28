const dayjs = require("dayjs")

const Format = (date) => {
    let newDate = dayjs(date);
    console.log(newDate);

    return {
        day: newDate.format('dddd'),
        month: newDate.format('MM'),
        year: newDate.format('YY'),
        time: newDate.format('HH:mm'),
        date: newDate.format('DD/MM/YY'),
        dayYear: newDate.format('dddd D MMMM YYYY'),
        dayYearShorter: newDate.format('dddd D MMMM'),
        monthYear: newDate.format('MMYYYY'),
        monthYearLong: newDate.format('MMMM YY')
    }
}

export { Format };