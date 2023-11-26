const base_controller = require('../controllers/base');
const SupporterService = require('../../services/Supporter');

module.exports = (router) => {
    router.get('/sign-in', base_controller.render('suppoter/sign-in', 'Suppoter sign in'));
    router.get('/sign-up', base_controller.render('suppoter/sign-up', 'Suppoter sign up'));

    router.post('/supporter/sign-up', base_controller.wrap(SupporterService.signUp));
    router.post('/supporter/sign-in', base_controller.wrap(SupporterService.signIn));

    router.get('/supporter/delete', base_controller.wrap_with_store(SupporterService.deleteAccount), (req, res) => res.redirect('/supporter/sign-in'));
};