const Event = require("../models/Event");
const Invitation = require("../models/Invitation");
const Artist = require("../models/Artist")

const v = require("../helpers/Validation");
const { SQLDate } = require("sqlifier");

module.exports = class EventService {
    static async getIncompleteByOrganizer (organizerId) {
        let eventInfo = await Event.getIncompleteByOrganizer(organizerId);

        if (!eventInfo) {
            eventInfo = await Event.insert({
                organizer_id: organizerId
            });
        }

        return eventInfo;
    }

    static async getReadyByOrganizer (res_wrap, body, { organizerInfo }) {
        try {
            res_wrap.events = await Event.getReadyByOrganizer(organizerInfo.id);
        } catch (e) { throw e; }

        return res_wrap;
    }

    static async getEventsByArtist (res_wrap, body) {
        const {stage_name} = body;

        const artists = await Artist.search({
            condition: {
                stage_name
            }
        });

        const invitations = [];

        for (let i = 0; i < artists.length; i++) {
            invitations.push(...await Invitation.getArtistInvitation(artists[0].id));
        }

        res_wrap.events = invitations;

        return res_wrap;
    }

    static async getAll (res_wrap, body) {
        try {
            res_wrap.events = await Event.find({
                condition: {
                    is_ready: true
                }
            });
        } catch (e) { throw e; }

        return res_wrap;
    }

    static async publish (res_wrap, body) {
        try {
            await Event.publish(body.event_id);
        } catch (e) { throw e; }

        return res_wrap;
    }

    static async getById (res_wrap, body) {
        try {
            res_wrap.event = await Event.getById(body.event_id)
        } catch (e) { throw e; }

        return res_wrap;
    }

    static async addDetails (res_wrap, body, { organizerInfo }) {
        try {
            v.validate({
                'Name': { value: body.name, min: 2, max: 30 },
                'Location': { value: body.name, min: 5, max: 50 },
            });

            const eventInfo = await EventService.getIncompleteByOrganizer(organizerInfo.id)

            eventInfo.is_ready = true;
            eventInfo.name = body.name;
            eventInfo.location = body.location;
            eventInfo.start_date = body.start_date;
            eventInfo.end_date = body.end_date;

            if (body.start_date == '') throw 'Please select a start date';
            if (body.end_date == '') throw 'Please select an end date';

            const used = [];

            try {
                for (let i = 0; i < body.invites.length; i++) {
                    const { artist_id, start_date, end_date } = body.invites[i];

                    if (artist_id == 'select') throw 'Please specify artist';

                    if (start_date == '') throw 'Please select a start date';
                    if (end_date == '') throw 'Please select an end date';

                    if (used.includes(artist_id)) continue;

                    let _start_date = new Date(start_date);
                    _start_date.setHours(_start_date.getHours() - 2)

                    let _end_date = new Date(end_date);
                    _end_date.setHours(_end_date.getHours() + 2)

                    const invite = await Invitation.findOne({
                        condition: [
                            {
                                artist_id,
                                start_date: { $lt:  SQLDate.toSQLDatetime(new Date()) },
                                end_date: { $gt: SQLDate.toSQLDatetime(_start_date) }
                            }
                        ],
                        join: [
                            {
                                ref: 'artist',
                                id: 'artist_id'
                            },
                            {
                                ref: 'event',
                                id: 'event_id'
                            }
                        ]
                    })

                    if (invite)
                        throw `The artist: ${invite.stage_name} is already invited to another event at this time`;

                    Invitation.insert({
                        organizer_id: organizerInfo.id,
                        artist_id: artist_id,
                        event_id: eventInfo.id,
                        start_date,
                        end_date
                    })

                    used.push(artist_id);
                }
            } catch (e) { throw e; }

            eventInfo.save();

            res_wrap.successful = true;

        } catch (e) { throw e; }
 
        return res_wrap;
    }

    static async addCover (res_wrap, body, req) {
        try {
            const organizerId = req.store.organizerInfo.id;

            const eventInfo = await EventService.getIncompleteByOrganizer(organizerId)

            if (!req.files[0]) return res_wrap;

            eventInfo.cover = req.files[0].filename;
            res_wrap.cover = req.files[0].filename;

            eventInfo.save();

            res_wrap.successful = true;

        } catch (e) { throw e; }
 
        return res_wrap;
    }
}