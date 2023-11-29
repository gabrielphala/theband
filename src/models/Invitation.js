const { SQLifier } = require('sqlifier');

module.exports = new (class Invitation extends SQLifier {
    constructor () {
        super();

        this.schema('invitation', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            organizer_id: { type: 'int', ref: 'organizer' },
            artist_id: { type: 'int', ref: 'artist' },
            start_date: { type: 'datetime' },
            end_date: { type: 'datetime' },
            event_id: { type: 'int', ref: 'event' },
            status: { type: 'varchar', length: 10, default: 'pending' }
        })
    }

    getArtistInvitation (artist_id) {
        return this.find({
            condition: {
                artist_id
            },
            join: {
                ref: 'event',
                condition: {
                    id: { $r: 'invitation.event_id' },
                    is_ready: true
                }
            }
        })
    }

    getByEvent (event_id) {
        return this.find({
            condition: { event_id },
            join: {
                ref: 'artist',
                id: 'artist_id'
            }
        })
    }

    search (query) {
        return this.raw(`
            SELECT invitation.id as id, eve.name as event_name, eve.location as location, eve.cover as event_cover,
                invitation.status as status, invitation.start_date as start_date, invitation.end_date as end_date
            FROM invitation
            INNER JOIN artist art 
            ON invitation.artist_id = art.id
            INNER JOIN event eve 
            ON invitation.event_id = eve.id
            WHERE art.stage_name LIKE '%${query}%'
        `);
    }

    accept (id) {
        return this.update({ id }, { status: 'Accepted' })
    }

    decline (id) {
        return this.update({ id }, { status: 'Declined' })
    }
})