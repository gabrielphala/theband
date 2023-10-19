const Event = require("../models/Event");
const Invitation = require("../models/Invitation");

const v = require("../helpers/Validation")

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
                'Name': { value: body.name, min: 2, max: 30 }
            });

            if (body.start_date == '') throw 'Please select a start date';
            if (body.end_date == '') throw 'Please select an end date';

            const eventInfo = await EventService.getIncompleteByOrganizer(organizerInfo.id)

            eventInfo.is_ready = true;
            eventInfo.name = body.name;
            eventInfo.start_date = body.start_date;
            eventInfo.end_date = body.end_date;

            const used = [];

            try {
                body.artists.forEach(artist => {
                    if (artist == 'select') throw 'Please specify artist';

                    if (used.includes(artist)) return;

                    Invitation.insert({
                        organizer_id: organizerInfo.id,
                        artist_id: artist,
                        event_id: eventInfo.id
                    })

                    used.push(artist);
                });
            } catch (e) { throw e; }

            eventInfo.save();

            res_wrap.successful = true;

        } catch (e) { throw e; }
 
        return res_wrap;
    }

    static async addCover (res_wrap, body, req) {
        try {
            const organizerId = req.store.organizerInfo.id;

            const eventInfo = await eventService.getIncompleteByOrganizer(organizerId)

            eventInfo.cover = req.files[0].filename;

            eventInfo.save();

            res_wrap.successful = true;

        } catch (e) { throw e; }
 
        return res_wrap;
    }
}