const { SQLifier } = require('sqlifier');

module.exports = new (class Song extends SQLifier {
    constructor() {
        super();

        this.schema('song', {
            id: { type: 'int', isAutoIncrement: true, isPrimary: true },
            name: { type: 'varchar', length: 40 },
            album_id: { type: 'int', ref: 'album' },
            artist_id: { type: 'int', ref: 'artist' },
            cover: { type: 'varchar', length: 255, default: 'default.png' },
            file: { type: 'varchar', length: 255 },
            has_file: { type: 'boolean', default: false },
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

    getReadySongsByArtist (artist_id) {
        return this.find({
            condition: {
                artist_id,
                is_ready: true,
                is_deleted: false
            },
            join: {
                kind: 'left',
                ref: 'album',
                id: 'album_id'
            }
        })
    }

    getAllReadySongs () {
        return this.find({
            condition: {
                is_ready: true,
                is_deleted: false
            },
            join: [
                {
                    kind: 'left',
                    ref: 'album',
                    id: 'album_id'
                },
                {
                    kind: 'left',
                    ref: 'artist',
                    id: 'artist_id'
                }
            ]
        })
    }

    deleteSongById (id) {
        return this.update({ id }, { is_deleted: true })
    }

    deleteSongsByAlbum (album_id) {
        return this.update({ album_id }, { is_deleted: true })
    }
})