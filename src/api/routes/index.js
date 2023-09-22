const base_routes = require('./base');
const artist_routes = require('./artist');
const album_routes = require('./album');
const song_routes = require('./song');
const organizer_routes = require('./organizer');
const suppoter_routes = require('./suppoter');
const event_routes = require('./event');
const invitation_routes = require('./invitation');

module.exports = (router) => {
    base_routes(router);
    artist_routes(router);
    album_routes(router);
    song_routes(router);
    organizer_routes(router);
    suppoter_routes(router);
    event_routes(router);
    invitation_routes(router);
};