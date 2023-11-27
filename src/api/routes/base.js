const { isLoggedIn } = require('../../middleware');
const base_controller = require('../controllers/base');

const DownloadService = require("../../services/Download");

module.exports = (router) => {
    router.get('/', base_controller.render('base/home', 'Where music lives'));
    router.get('/events', isLoggedIn, base_controller.render('base/events', 'Check up on events'));
    router.get('/event/view', isLoggedIn, base_controller.render('base/event-view', 'View event details'));
    router.get('/listen', base_controller.render('base/listen', 'Now listening to...'));

    router.get('/sign-out', (req, res) => {
        res.clearCookie('tb_organizer')
        res.clearCookie('tb_supporter')
        res.clearCookie('tb_artist')

        res.redirect('/')
    });

    router.post('/download/csv', base_controller.wrap(DownloadService.download))
    router.post('/download/word', base_controller.wrap(DownloadService.downloadWord))
};