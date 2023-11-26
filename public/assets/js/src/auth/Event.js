import { arrayNotEmpty } from "../helpers/array.js";
import fetch from "../helpers/fetch.js"
import { showError } from "../helpers/error.js"

import { formatArtistSelect, formatEventsForOrganizer, formatEventsForHome } from "../helpers/format.js";
import { closeModal } from "../helpers/modal";
import { getQuery } from "../helpers/urlquery.js";

export default () => {
    window.Event = class Event {
        static async addDetails () {
            const invites = [];

            Array.from($('.artists__item')).forEach((artist, index) => {
                invites.push({
                    artist_id: artist.value,
                    start_date: $(`#start-date-${index + 1}`).val(),
                    end_date: $(`#end-date-${index + 1}`).val(),
                })
            })

            const res = await fetch('/event/add-details', {
                body: {
                    name: $('#event-name').val(),
                    start_date: $('#start-date').val(),
                    end_date: $('#end-date').val(),
                    invites
                }
            })

            if (res.successful) {
                Event.getAllByOrganizer();
                
                return closeModal('new-event')
            }

            showError('event-error', res.error)
        }

        static async getAllByOrganizer () {
            const response = await fetch('/events/get-ready-by-organizer')
            $('#artist-1').html(formatArtistSelect((await fetch('/artists/get-all')).artists));

            if (arrayNotEmpty(response.events)) {
                $('#no-events')[0].style.display = 'none';

                $('#event-list').html(formatEventsForOrganizer(response.events));
                return 
            }

            $('#event-list').html(' ');
            $('#no-events')[0].style.display = 'flex'
        }

        static async getAll () {
            const response = await fetch('/events/get-all-ready')

            if (arrayNotEmpty(response.events)) {
                $('#event-list').html(formatEventsForHome(response.events));
                return 
            }

            $('#event-list').html(' ');
        }

        static async searchByArtist () {
            const response = await fetch('/events/search', {
                body:{
                    stage_name: $('#event-search').val()
                }
            })

            if (arrayNotEmpty(response.events)) {
                $('#event-list').html(formatEventsForHome(response.events));
                return 
            }

            $('#event-list').html(' ');
        }

        static async viewOne () {
            const res = await fetch('/event/get-one-by-id', {
                body: {
                    event_id: getQuery('e')
                }
            })

            Invitation.viewInvitationOrg(getQuery('e'))
        }
    }
}