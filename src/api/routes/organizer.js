const base_controller = require('../controllers/base');
const OrganizerService = require('../../services/Organizer');

const { isOrganizerLoggedIn } = require('../../middleware');

module.exports = (router) => {
    router.get('/organizer/sign-up', base_controller.render('organizer/sign-up', 'Sign up'));
    router.get('/organizer/sign-in', base_controller.render('organizer/sign-in', 'Sign in'));
    router.get('/organizer/events', isOrganizerLoggedIn, base_controller.render('organizer/events', 'My events'));
    router.get('/organizer/events/manage', isOrganizerLoggedIn, base_controller.render('organizer/manage', 'Manage event'));

    router.get('/organizer/sign-out', (req, res) => {
        res.clearCookie('tb_organizer')

        return res.redirect('/organizer/sign-in');
    });

    router.post('/organizer/sign-up', base_controller.wrap(OrganizerService.signUp));
    router.post('/organizer/sign-in', base_controller.wrap(OrganizerService.signIn));
};