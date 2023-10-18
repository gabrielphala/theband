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

            songInfo.name = body.name;
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
}