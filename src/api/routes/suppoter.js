const base_controller = require('../controllers/base');

module.exports = (router) => {
    router.get('/sign-in', base_controller.render('suppoter/sign-in', 'Suppoter sign in'));
};