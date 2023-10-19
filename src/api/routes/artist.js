const base_controller = require('../controllers/base');
const ArtistService = require('../../services/Artist');
const { isArtistLoggedIn } = require('../../middleware');

module.exports = (router) => {
    router.get('/artist/sign-in', base_controller.render('artist/sign-in', 'Artist sign in'));
    router.get('/artist/sign-up', base_controller.render('artist/sign-up', 'Artist sign up'));
    router.get('/artist/discography', isArtistLoggedIn, base_controller.render('artist/discography', 'My discography'));
    router.get('/artist/invitations', isArtistLoggedIn, base_controller.render('artist/invitations', 'My invitations'));

    router.get('/artist/sign-out', (req, res) => {
        res.clearCookie('tb_artist')

        return res.redirect('/artist/sign-in');
    });

    router.post('/artist/sign-up', base_controller.wrap(ArtistService.signUp));
    router.post('/artist/sign-in', base_controller.wrap(ArtistService.signIn));
    router.post('/artists/get-all', base_controller.wrap(ArtistService.getAll));
};