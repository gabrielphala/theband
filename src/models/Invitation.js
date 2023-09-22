const { SQLifier } = require('sqlifier');

module.exports = new (class Invitation extends SQLifier {
    constructor () {
        super();

        this.schema('invitation', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            organizer_id: { type: 'int', ref: 'organizer' },
            artist_id: { type: 'int', ref: 'artist' },
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

    accept (id) {
        return this.update({ id }, { status: 'Accepted' })
    }

    decline (id) {
        return this.update({ id }, { status: 'Declined' })
    }
})