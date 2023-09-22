const makeDate = (date) => {
    const newDate = date || new Date();

    return new Date(newDate.toLocaleString('en-US', { timeZone: 'Africa/Johannesburg' }));
}

const makeMySQLDate = (date = makeDate()) => {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

module.exports = Object.freeze({
    makeMySQLDate
})