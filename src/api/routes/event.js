const base_controller = require('../controllers/base');
const EventService = require('../../services/Event');

module.exports = (router) => {
    router.post('/event/add-details', base_controller.wrap_with_store(EventService.addDetails));
    router.post('/event/get-one-by-id', base_controller.wrap_with_store(EventService.getById));
    router.post('/events/get-ready-by-organizer', base_controller.wrap_with_store(EventService.getReadyByOrganizer));
    router.post('/events/get-all-ready', base_controller.wrap_with_store(EventService.getAll));
    router.post('/events/search', base_controller.wrap_with_store(EventService.getEventsByArtist));
};