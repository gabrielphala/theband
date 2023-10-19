import { arrayNotEmpty } from "../helpers/array.js";
import fetch from "../helpers/fetch.js"

import { formatInvitationsForArtists, formatInvitationsForOrganizer, formatForHome } from "../helpers/format.js";
import { getQuery } from "../helpers/urlquery.js";

export default () => {
    window.Invitation = class Invitation {
        static async getAllByArtists () {
            const response = await fetch('/invitations/get-by-artist')

            if (arrayNotEmpty(response.invitations)) {
                $('#no-events')[0].style.display = 'none'

                $('#event-list').html(formatInvitationsForArtists(response.invitations));

                $('#accept-invite').on('click', e => {
                    const set = e.currentTarget.parentElement.dataset;

                    Invitation.accept(set.inviteid)
                })

                $('#decline-invite').on('click', e => {
                    const set = e.currentTarget.parentElement.dataset;

                    Invitation.decline(set.inviteid)
                })

                return
            }

            $('#event-list').html(' ');
            $('#no-events')[0].style.display = 'flex'
        }

        static async viewInvitationOrg (event_id) {
            const response = await fetch('/invitations/get-by-event', {
                body: {
                    event_id
                }
            })

            if (arrayNotEmpty(response.invitations)) {
                $('#no-invitations')[0].style.display = 'none';

                $('#invitation-list').html(formatInvitationsForOrganizer(response.invitations));

                return
            }

            $('#invitation-list').html(' ');
            $('#no-invitations')[0].style.display = 'flex'
        }

        static async getForHome () {
            const response = await fetch('/invitations/get-by-event', {
                body: {
                    event_id: getQuery('e')
                }
            })

            if (arrayNotEmpty(response.invitations)) {
                $('#invitation-list').html(formatForHome(response.invitations));

                return
            }
        }

        static async accept (invite_id) {
            const response = await fetch('/invitation/accept', {
                body: {
                    invite_id
                }
            })

            Invitation.getAllByArtists()
        }

        static async decline (invite_id) {
            const response = await fetch('/invitation/decline', {
                body: {
                    invite_id
                }
            })

            Invitation.getAllByArtists()
        }
    }
}