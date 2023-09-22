const base_controller = require('../controllers/base');

module.exports = (router) => {
    router.get('/', base_controller.render('base/home', 'Where music lives'));
    router.get('/events', base_controller.render('base/events', 'Check up on events'));
    router.get('/listen', base_controller.render('base/listen', 'Now listening to...'));
};