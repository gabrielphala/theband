const makeDate = (date) => {
    const newDate = date || new Date();

    return new Date(newDate.toLocaleString('en-US', { timeZone: 'Africa/Johannesburg' }));
}

const makeMySQLDate = (date = makeDate()) => {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

const timeDiff = (date1, date2) => {
    const diff = date2.getTime() - date1.getTime();

    return Math.floor(diff / 1000 / 60 / 60);
}

module.exports = Object.freeze({
    makeMySQLDate,
    timeDiff
})