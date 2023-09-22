const getMonths = () => ([
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]);

const makeTime = (date) => {
    let hours = date.getHours(),
        minutes = date.getMinutes();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    let time = hours + ':' + minutes,
        day = date.getDate(),
        month = getMonths()[date.getMonth()],
        year = date.getFullYear().toString();

    return { time, day, month, year }
}

export const getStaticDate = (date) => {
    return moment(new Date(date)).tz('Africa/Johannesburg').format('HH:mm[,] DD MMMM YYYY')
}
