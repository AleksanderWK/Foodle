export const monthNamesNor = [
    'januar',
    'februar',
    'mars',
    'april',
    'mai',
    'juni',
    'juli',
    'august',
    'septemer',
    'oktober',
    'november',
    'desember',
]

export const getDayMonthFromDate = (date: Date) => {
    const formattedDay =
        date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const formattedMonth =
        date.getUTCMonth() + 1 < 10
            ? '0' + (date.getUTCMonth() + 1)
            : date.getUTCMonth() + 1
    return formattedDay + '.' + formattedMonth
}
