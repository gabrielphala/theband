const { SQLifier } = require('sqlifier');

module.exports = new (class Album extends SQLifier {
    constructor() {
        super();

        this.schema('album', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            name: { type: 'varchar', length: 40 },
            artist_id: { type: 'int', ref: 'artist' },
            cover: { type: 'varchar', length: 255, default: 'default.png' },
            is_ready: { type: 'boolean', default: false },
            is_deleted: { type: 'boolean', default: false }
        })
    }

    getIncompleteByArtist (artist_id) {
        return this.findOne({
            condition: {
                artist_id,
                is_ready: false
            }
        })
    }

    getReadyAlbumsByArtist (artist_id) {
        return this.find({
            condition: {
                artist_id,
                is_ready: true,
                is_deleted: false
            }
        })
    }

    delete_album (id) {
        return this.update({ id }, { is_deleted: true })
    }
})