const Song = require("../models/Song");

module.exports = class SongService {
    static async getIncompleteByArtist (artistId) {
        let songInfo = await Song.getIncompleteByArtist(artistId);

        if (!songInfo) {
            songInfo = await Song.insert({
                artist_id: artistId
            });
        }

        return songInfo;
    }

    static async addSongName (res_wrap, body, { artistInfo }) {
        try {
            const songInfo = await SongService.getIncompleteByArtist(artistInfo.id)

            if (body.genre == 'select') throw 'Please select genre'

            songInfo.name = body.name;
            songInfo.genre = body.genre;
            songInfo.album_id = body.album_id || null;

            if (songInfo.has_file || body.album_id && songInfo.has_file)
                songInfo.is_ready = true;

            songInfo.save();

            res_wrap.successful = true;

        } catch (e) { throw e; }
 
        return res_wrap;
    }

    static async addSongCover (res_wrap, body, req) {
        try {
            const artistId = req.store.artistInfo.id;

            if (!req.files[0]) return res_wrap;

            const songInfo = await SongService.getIncompleteByArtist(artistId)

            songInfo.cover = req.files[0].filename;

            songInfo.save();

            res_wrap.cover = req.files[0].filename;
            res_wrap.successful = true;

        } catch (e) { throw e; }
 
        return res_wrap;
    }

    static async addSongFile (res_wrap, body, req) {
        try {
            const artistId = req.store.artistInfo.id;

            const songInfo = await SongService.getIncompleteByArtist(artistId)

            songInfo.has_file = true;
            songInfo.file = req.files[0].filename;

            songInfo.save();

            res_wrap.successful = true;

        } catch (e) { throw e; }
 
        return res_wrap;
    }

    static async getAllReadyByArtist (res_wrap, body, { artistInfo }) {
        try {
            res_wrap.songs = await Song.getReadySongsByArtist(artistInfo.id);

            res_wrap.successful = true;

        } catch (e) { throw e; }

        return res_wrap;
    }

    static async getAllReadySongs (res_wrap, body) {
        try {
            res_wrap.songs = await Song.getAllReadySongs();

            res_wrap.successful = true;

        } catch (e) { throw e; }

        return res_wrap;
    }

    static async getSongsFromAlbum (res_wrap, body) {
        try {
            const { song_id } = body;

            res_wrap.songs = []

            const songDetails = await Song.findOne({
                condition: {
                    id: song_id
                }
            })

            if (!songDetails) return res_wrap;

            res_wrap.songs = await Song.find({
                condition: {
                    album_id: songDetails.album_id
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

            res_wrap.successful = true;

        } catch (e) { throw e; }

        return res_wrap;
    }

    static async getSongById (res_wrap, body) {
        try {
            const { song_id } = body;

            res_wrap.song = (await Song.findOne({
                condition: {
                    id: song_id
                }
            })).toObject()

            res_wrap.successful = true;

        } catch (e) { throw e; }

        return res_wrap;
    }

    static async deleteSongById (res_wrap, body) {
        try {
            Song.deleteSongById(body.song_id);

            res_wrap.successful = true;

        } catch (e) { throw e; }

        return res_wrap;
    }

    static async search (res_wrap, body) {
        try {
            const { query } = body;

            res_wrap.songs = await Song.search(query);

            res_wrap.successful = true;

        } catch (e) { throw e; }

        return res_wrap;
    }
}