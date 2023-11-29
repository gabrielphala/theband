const Invitation = require("../models/Invitation");

module.exports = class InvitationService {
    static async getArtistInvitation (res_wrap, body, { artistInfo }) {
        try {
            res_wrap.invitations = await Invitation.getArtistInvitation(artistInfo.id);

            res_wrap.successful = true;

        } catch (e) { throw e; }
 
        return res_wrap;
    }

    static async getByEvent (res_wrap, body) {
        try {
            res_wrap.invitations = await Invitation.getByEvent(body.event_id)

            res_wrap.successful = true;

        } catch (e) { throw e; }

        return res_wrap;
    }

    static async search (res_wrap, body) {
        try {
            const {query} = body;

            res_wrap.invitations = await Invitation.search(query)

            res_wrap.successful = true;

        } catch (e) { throw e; }

        return res_wrap;
    }

    static async accept (res_wrap, body, { artistInfo }) {
        try {
            if (!(await Invitation.exists({ id: body.invite_id, artist_id: artistInfo.id, status: 'pending' })).found)
                throw 'Invitation not found or response has been captured';

            res_wrap.invitations = await Invitation.accept(body.invite_id);

            res_wrap.successful = true;

        } catch (e) { throw e; }
 
        return res_wrap;
    }

    static async decline (res_wrap, body, { artistInfo }) {
        try {
            if (!(await Invitation.exists({ id: body.invite_id, artist_id: artistInfo.id, status: 'pending' })).found)
                throw 'Invitation not found or response has been captured';

            res_wrap.invitations = await Invitation.decline(body.invite_id);

            res_wrap.successful = true;

        } catch (e) { throw e; }
 
        return res_wrap;
    }
}