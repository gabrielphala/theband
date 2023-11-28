const base_controller = require('../controllers/base');
const EventService = require('../../services/Event');

const { anyFiles } = require('../../config/multer');

module.exports = (router) => {
    router.post('/event/add-details', base_controller.wrap_with_store(EventService.addDetails));
    router.post('/event/get-one-by-id', base_controller.wrap_with_store(EventService.getById));
    router.post('/events/get-ready-by-organizer', base_controller.wrap_with_store(EventService.getReadyByOrganizer));
    router.post('/events/get-all-ready', base_controller.wrap_with_store(EventService.getAll));
    router.post('/events/search', base_controller.wrap_with_store(EventService.getEventsByArtist));

    router.post(
        '/event/add-cover',
        (req, res, next) => {
            anyFiles('./public/assets/uploads/covers')(req, res, async (err) => {
                req.res_wrap = await EventService.addCover(
                    base_controller.res_wrap,
                    req.body,
                    req
                )

                next()
            })
        },
        base_controller.wrap_with_request((res_wrap, _, req) => {
            return { ...res_wrap, ...req.res_wrap }
        })
    );
};