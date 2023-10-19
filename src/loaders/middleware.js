const { loadArtistInfo, loadOrganizerInfo, loadSupporterInfo } = require('../middleware');

const cookieParser = require('cookie-parser');

module.exports = (app) => {
    app.use(cookieParser());
    app.use(loadArtistInfo);
    app.use(loadOrganizerInfo);
    app.use(loadSupporterInfo);
};