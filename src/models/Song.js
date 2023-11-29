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
            genre: { type: 'varchar', length: 55 },
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

    search (query) {
        return this.raw(`
            SELECT song.id as id, song.genre as genre, song.album_id as album_id,
                song.name as name, al.name as _album_name, art.stage_name as stage_name,
                song.cover as cover, al.cover as _album_cover
            FROM song
            INNER JOIN artist art 
            ON song.artist_id = art.id
            INNER JOIN album al 
            ON song.album_id = al.id
            WHERE art.stage_name LIKE '%${query}%'
        `);
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