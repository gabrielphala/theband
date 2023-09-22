const { SQLifier } = require('sqlifier');

module.exports = new (class Event extends SQLifier {
    constructor () {
        super();

        this.schema('event', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            organizer_id: { type: 'int', ref: 'organizer' },
            name: { type: 'varchar', length: 250 },
            cover: { type: 'varchar', length: 250 },
            start_date: { type: 'datetime' },
            end_date: { type: 'datetime' },
            is_ready: { type: 'boolean', default: false },
            is_published: { type: 'boolean', default: false },
        })
    }

    getById (id) {
        return this.findOne({
            condition: {
                id
            }
        })
    }

    getIncompleteByOrganizer (organizer_id) {
        return this.findOne({
            condition: {
                organizer_id,
                is_ready: false
            }
        })
    }

    getReadyByOrganizer (organizer_id) {
        return this.find({
            condition: {
                organizer_id,
                is_ready: true
            }
        })
    }
})