const { isLoggedIn } = require('../../middleware');
const base_controller = require('../controllers/base');

module.exports = (router) => {
    router.get('/', base_controller.render('base/home', 'Where music lives'));
    router.get('/events', isLoggedIn, base_controller.render('base/events', 'Check up on events'));
    router.get('/listen', base_controller.render('base/listen', 'Now listening to...'));

    router.get('/sign-out', (req, res) => {
        res.clearCookie('tb_organizer')
        res.clearCookie('tb_supporter')
        res.clearCookie('tb_artist')

        res.redirect('/')
    });
};