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
        dayMonthYear: newDate.format('dddd D MMMM YYYY'),
        dayMonth: newDate.format('ddd Do MMMM'),
        daySmallMonth: newDate.format('ddd Do MMM'),
        monthYear: newDate.format('MMYYYY'),
        monthYearLong: newDate.format('MMMM YY'),
        dateTime: newDate.format('ddd Do HH:mma')
    }
}

export { Format };