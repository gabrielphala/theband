const base_controller = require('../controllers/base');
const InvitationService = require('../../services/Invitation');

module.exports = (router) => {
    router.post('/invitations/get-by-artist', base_controller.wrap_with_store(InvitationService.getArtistInvitation));
    router.post('/invitations/get-by-event', base_controller.wrap(InvitationService.getByEvent));
    router.post('/invitation/accept', base_controller.wrap_with_store(InvitationService.accept));
    router.post('/invitation/decline', base_controller.wrap_with_store(InvitationService.decline));
};