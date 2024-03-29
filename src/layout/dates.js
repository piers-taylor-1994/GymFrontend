const dayjs = require("dayjs")
var advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);

const Format = (date) => {
    let newDate = dayjs(date);

    return {
        day: newDate.format('dddd'),
        month: newDate.format('MM'),
        year: newDate.format('YY'),
        time: newDate.format('HH:mm'),
        date: newDate.format('DD/MM/YYYY'),
        dayYear: newDate.format('dddd D MMMM YYYY'),
        dayYearShorter: newDate.format('dddd D MMMM'),
        monthYear: newDate.format('MMYYYY'),
        monthYearLong: newDate.format('MMMM YY'),
        dateTime: newDate.format('ddd Do HH:mma')
    }
}

export { Format };